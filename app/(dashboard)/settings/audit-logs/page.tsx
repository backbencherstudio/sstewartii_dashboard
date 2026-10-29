"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Eye,
  Filter,
  RefreshCw,
  RotateCcw,
  Calendar,
  User,
  Shield,
  Layers,
  CheckCircle2,
  AlertCircle,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import PageTitle from "@/components/reusable/PageTitle";
import { cn } from "@/lib/utils";
import {
  useAuditLogs,
  useAuditLogStaff,
  useAuditLogActions,
  useAuditLogSummary,
} from "@/hooks/useSettings";
import { AdminLog, AuditLogQueryParams } from "@/types/settings.types";
import AuditLogDetailsModal from "../_components/AuditLogDetailsModal";
import AuditLogStats from "../_components/AuditLogStats";
import AppSelect from "@/components/reusable/AppSelect";

// ==================== Helpers ====================

const formatDate = (date?: string | null) => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return date;
  }
};

const formatAction = (action?: string | null) => {
  if (!action) return "N/A";
  return action
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// ==================== Action Badge ====================

const ActionBadge = ({ action }: { action: string }) => {
  return (
    <span
      className={cn(
        "inline-flex rounded-lg px-2.5 py-1",
        "bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF]",
        "text-xs font-semibold uppercase tracking-wide",
      )}
    >
      {formatAction(action)}
    </span>
  );
};

// ==================== Entity Badge ====================

const EntityBadge = ({
  entity,
  entityType,
}: {
  entity?: string | null;
  entityType?: string | null;
}) => {
  const display = entity || entityType || "UNKNOWN";
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700">
      {display}
    </span>
  );
};

// ==================== Columns ====================

const getColumns = (onView: (id: string) => void): Column<AdminLog>[] => [
  {
    header: "Admin / Actor",
    cell: (row) => {
      const actor = row?.admin || row?.actorUser;
      const name = actor?.name || row?.actorNameSnapshot || "System";
      const email = actor?.email || "No email";
      return (
        <div>
          <p className="text-sm font-semibold text-[#1A1A2E] leading-tight">
            {name}
          </p>
          <p className="text-xs text-[#697586] mt-0.5">{email}</p>
        </div>
      );
    },
  },

  {
    header: "Action",
    cell: (row) => <ActionBadge action={row?.action} />,
  },

  {
    header: "Entity",
    cell: (row) => (
      <div>
        <EntityBadge entity={row?.entity} entityType={row?.entityType} />
        {row?.entityId && (
          <p
            className="text-[11px] text-[#697586] font-mono truncate max-w-28 mt-0.5"
            title={row.entityId}
          >
            {row.entityId}
          </p>
        )}
      </div>
    ),
  },

  {
    header: "Reason / Details",
    cell: (row) => {
      const text = row?.reason || row?.description || "N/A";
      return (
        <div
          className="max-w-56 truncate text-sm font-medium text-[#697586]"
          title={text}
        >
          {text}
        </div>
      );
    },
  },

  {
    header: "Status",
    cell: (row) => {
      const isSuccess = row?.result === "SUCCESS" || !row?.result;
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full",
            isSuccess
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-rose-50 text-rose-700 border border-rose-200",
          )}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          {row?.result || "SUCCESS"}
        </span>
      );
    },
  },

  {
    header: "IP Address",
    cell: (row) => (
      <div className="text-xs font-mono text-[#161618]">
        {row?.ipAddress || "N/A"}
      </div>
    ),
  },

  {
    header: "Date & Time",
    cell: (row) => (
      <div className="text-xs font-medium text-[#161618] whitespace-nowrap">
        {formatDate(row?.createdAt)}
      </div>
    ),
  },

  {
    header: "Action",
    cell: (row) => (
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-lg border border-[#DFE1E7] hover:bg-gray-50 hover:text-gray-900"
        onClick={() => onView(row.id)}
        title="View details"
      >
        <Eye className="h-4 w-4 text-[#697586]" />
      </Button>
    ),
  },
];

// ==================== Main Component ====================

export default function AuditLogTable() {
  const [selectedAuditLogId, setSelectedAuditLogId] = useState<string | null>(
    null,
  );

  // Filter states
  const [search, setSearch] = useState("");
  const [actorUserId, setActorUserId] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [entityType, setEntityType] = useState<string>("");
  const [entityId, setEntityId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(true);

  // Pagination states (server-side synced with API)
  const [page, setPage] = useState<number>(1);
  const limit = 20;

  // Queries for dynamic filter choices
  const { data: staffList = [], isLoading: isLoadingStaff } = useAuditLogStaff();
  const { data: actionsList = [], isLoading: isLoadingActions } =
    useAuditLogActions();
  const { data: summaryData } = useAuditLogSummary();

  // Query params for logs
  const queryParams: AuditLogQueryParams = useMemo(() => {
    return {
      search: search.trim() || undefined,
      actorUserId: actorUserId || undefined,
      action: action || undefined,
      entityType: entityType.trim() || undefined,
      entityId: entityId.trim() || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      page,
      limit,
    };
  }, [search, actorUserId, action, entityType, entityId, startDate, endDate, page, limit]);

  const {
    getAuditLogsList: { data, isLoading, error, refetch, isRefetching },
  } = useAuditLogs(queryParams);

  // Defensive array extraction matching any API shape:
  // 1) data.data.items (actual API format)
  // 2) data.items
  // 3) data.data (array)
  // 4) data (array)
  const auditLogs: AdminLog[] = useMemo(() => {
    if (!data) return [];
    const res = data as unknown as Record<string, unknown>;
    const nestedData = res?.data as Record<string, unknown> | undefined;

    let items: AdminLog[] = [];
    if (Array.isArray(res)) items = res as AdminLog[];
    else if (Array.isArray(nestedData?.items)) items = nestedData.items as AdminLog[];
    else if (Array.isArray(res?.items)) items = res.items as AdminLog[];
    else if (Array.isArray(res?.data)) items = res.data as AdminLog[];
    else if (Array.isArray(nestedData?.logs)) items = nestedData.logs as AdminLog[];
    else if (Array.isArray(res?.logs)) items = res.logs as AdminLog[];
    else if (Array.isArray(nestedData?.auditLogs)) items = nestedData.auditLogs as AdminLog[];
    else if (Array.isArray(res?.auditLogs)) items = res.auditLogs as AdminLog[];

    // Client-side fallback filter: In case the server ignores actorUserId or doesn't filter
    if (actorUserId) {
      items = items.filter(
        (log) =>
          log.actorUserId === actorUserId ||
          log.adminId === actorUserId ||
          log.admin?.id === actorUserId ||
          log.actorUser?.id === actorUserId,
      );
    }

    return items;
  }, [data, actorUserId]);

  // Extract pagination info from API response
  const paginationInfo = useMemo(() => {
    const res = data as unknown as Record<string, unknown> | undefined;
    const nestedData = res?.data as Record<string, unknown> | undefined;

    const pag = (nestedData?.pagination ||
      res?.pagination ||
      nestedData?.meta ||
      res?.meta) as Record<string, unknown> | undefined;

    const total =
      (typeof pag?.total === "number" ? pag.total : null) ??
      (typeof nestedData?.total === "number" ? nestedData.total : null) ??
      (typeof res?.total === "number" ? res.total : null) ??
      auditLogs.length;

    const totalPages =
      (typeof pag?.totalPages === "number" ? pag.totalPages : null) ??
      (typeof nestedData?.totalPages === "number" ? nestedData.totalPages : null) ??
      (typeof res?.totalPages === "number" ? res.totalPages : null) ??
      (limit > 0 ? Math.ceil(total / limit) : 1);

    const currentPage =
      (typeof pag?.page === "number" ? pag.page : null) ??
      (typeof nestedData?.page === "number" ? nestedData.page : null) ??
      (typeof res?.page === "number" ? res.page : null) ??
      page;

    return {
      total,
      totalPages: Math.max(totalPages, 1),
      currentPage,
    };
  }, [data, auditLogs.length, limit, page]);

  const handleResetFilters = () => {
    setSearch("");
    setActorUserId("");
    setAction("");
    setEntityType("");
    setEntityId("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const hasActiveFilters = Boolean(
    search ||
      actorUserId ||
      action ||
      entityType ||
      entityId ||
      startDate ||
      endDate,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <PageTitle
            title="Audit Logs"
            description="Track system actions, staff activities, and administrative security events."
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            className="rounded-xl border-[#EDEDED] text-gray-700 hover:bg-gray-50 flex items-center gap-2 h-10 px-3.5 text-xs font-semibold shadow-xs"
          >
            <RefreshCw
              className={cn("w-3.5 h-3.5", isRefetching && "animate-spin")}
            />
            <span>Refresh</span>
          </Button>

          <Button
            type="button"
            variant={isFilterExpanded ? "default" : "outline"}
            size="sm"
            onClick={() => setIsFilterExpanded((prev) => !prev)}
            className={cn(
              "rounded-xl h-10 px-3.5 text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors",
              isFilterExpanded
                ? "bg-[#E28611] hover:bg-[#c77209] text-white"
                : "border-[#EDEDED] text-gray-700 hover:bg-gray-50",
            )}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-white ml-0.5 animate-pulse" />
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <AuditLogStats summary={summaryData} totalLogs={paginationInfo.total} />

      {/* Filter Toolbar Card */}
      <div className="bg-white rounded-2xl border border-[#EDEDED] shadow-xs overflow-hidden">
        {/* Top Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F0F0F0] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by reason, description, admin, or IP..."
              className="w-full bg-[#F6F8FA] pl-10 pr-4 py-2.5 rounded-xl text-sm border-0 placeholder:text-[#697586] focus:outline-none focus:ring-2 focus:ring-[#E28611]/40"
            />
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
            <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
              Showing <span className="font-bold text-gray-900">{auditLogs.length}</span> logs
            </div>
          </div>
        </div>

        {/* Extended Filter Controls (Matching Postman / API Params) */}
        {isFilterExpanded && (
          <div className="p-4 sm:p-5 bg-[#FAFAFA]/70 border-b border-[#F0F0F0]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
              {/* 1. Staff / Actor Filter (GET /admin/audit-logs/staff -> actorUserId) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3 text-[#E28611]" />
                  <span>Staff / Actor</span>
                </label>
                <AppSelect
                  value={actorUserId}
                  onValueChange={(val) => {
                    setActorUserId(val);
                    setPage(1);
                  }}
                  disabled={isLoadingStaff}
                  placeholder="All Staff / Actors"
                  options={[
                    { value: "", label: "All Staff / Actors" },
                    ...staffList.map((st) => ({
                      value: st.id,
                      label: `${st.name} (${st.role || "Staff"})`,
                    })),
                  ]}
                />
              </div>

              {/* 2. Action Filter (GET /admin/audit-logs/actions -> action) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#E28611]" />
                  <span>Action</span>
                </label>
                <AppSelect
                  value={action}
                  onValueChange={(val) => {
                    setAction(val);
                    setPage(1);
                  }}
                  disabled={isLoadingActions}
                  placeholder="All Actions"
                  options={[
                    { value: "", label: "All Actions" },
                    ...actionsList.map((act) => ({
                      value: act,
                      label: formatAction(act),
                    })),
                  ]}
                />
              </div>

              {/* 3. Entity Type Filter (entityType) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3 text-[#E28611]" />
                  <span>Entity Type</span>
                </label>
                <input
                  type="text"
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value)}
                  placeholder="e.g. USER, VENDOR"
                  className="w-full bg-white border border-[#E0E2E7] rounded-xl px-2.5 py-2 text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E28611]/30 hover:border-gray-300 transition-colors"
                />
              </div>

              {/* 4. Entity ID Filter (entityId) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                  <Hash className="w-3 h-3 text-[#E28611]" />
                  <span>Entity ID</span>
                </label>
                <input
                  type="text"
                  value={entityId}
                  onChange={(e) => setEntityId(e.target.value)}
                  placeholder="e.g. 75601dc9..."
                  className="w-full bg-white border border-[#E0E2E7] rounded-xl px-2.5 py-2 text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E28611]/30 hover:border-gray-300 transition-colors"
                />
              </div>

              {/* 5. Start Date (startDate) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#E28611]" />
                  <span>Start Date</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white border border-[#E0E2E7] rounded-xl px-2.5 py-1.5 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E28611]/30 hover:border-gray-300 transition-colors"
                />
              </div>

              {/* 6. End Date (endDate) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#E28611]" />
                  <span>End Date</span>
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white border border-[#E0E2E7] rounded-xl px-2.5 py-1.5 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E28611]/30 hover:border-gray-300 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* Table Content */}
        {isLoading ? (
          <div className="p-16 text-center space-y-3">
            <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#E28611] mx-auto" />
            <p className="text-sm text-gray-500 font-medium">
              Loading audit logs...
            </p>
          </div>
        ) : error ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">
                Failed to load audit logs
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Could not fetch audit records from the server.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="rounded-xl border-gray-300 text-xs"
            >
              Try Again
            </Button>
          </div>
        ) : auditLogs.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-[#E28611] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">
              No audit logs found
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              No activity logs matched your current filters. Try resetting the
              filters or searching for a different keyword.
            </p>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="rounded-xl text-xs mt-2"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <DataTable
            columns={getColumns((id) => setSelectedAuditLogId(id))}
            data={auditLogs}
            pageSize={limit}
            serverPagination={{
              currentPage: paginationInfo.currentPage,
              totalPages: paginationInfo.totalPages,
              totalCount: paginationInfo.total,
              onPageChange: (newPage) => setPage(newPage),
            }}
          />
        )}
      </div>

      {/* Details Modal */}
      <AuditLogDetailsModal
        id={selectedAuditLogId}
        open={!!selectedAuditLogId}
        onOpenChange={(open) => {
          if (!open) setSelectedAuditLogId(null);
        }}
      />
    </div>
  );
}
