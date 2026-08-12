"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Eye } from "lucide-react";
import TableToolBar from "@/components/reusable/table/TableToolBar";
import { cn } from "@/lib/utils";
import { useAuditLogs } from "@/hooks/useSettings";
import AuditLogDetailsModal from "../_components/AuditLogDetailsModal";

// ==================== Types ====================

type AuditLog = {
    id: string;
    adminId: string;
    action: string;
    entity: string;
    entityId: string | null;
    changes: {
        logoutTime?: string;
        to?: string;
        from?: string;
        [key: string]: string | undefined;
    };
    reason: string;
    ipAddress: string;
    userAgent: string;
    createdAt: string;
    updatedAt: string;
    admin: {
        id: string;
        name: string;
        email: string;
    };
};

// ==================== Helpers ====================

const formatDate = (date: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatAction = (action: string) => {
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
                "inline-flex rounded-lg px-3 py-1.5",
                "bg-[#EEF2FF] text-[#4F46E5]",
                "text-xs font-semibold uppercase"
            )}
        >
            {formatAction(action)}
        </span>
    );
};

// ==================== Entity ====================

const EntityBadge = ({ entity }: { entity: string }) => {
    return (
        <span className="text-sm font-medium text-[#161618]">
            {entity || "N/A"}
        </span>
    );
};

// ==================== Columns ====================

const getColumns = (
    onView: (id: string) => void
): Column<AuditLog>[] => [
    {
        header: "Admin",
        cell: (row) => (
            <div>
                <p className="text-sm font-semibold text-[#1A1A2E]">
                    {row.admin?.name || "N/A"}
                </p>

                <p className="text-xs text-[#697586]">
                    {row.admin?.email || "N/A"}
                </p>
            </div>
        ),
    },

    {
        header: "Action",
        cell: (row) => (
            <ActionBadge action={row.action} />
        ),
    },

    {
        header: "Entity",
        cell: (row) => (
            <EntityBadge entity={row.entity} />
        ),
    },

    {
        header: "Reason",
        cell: (row) => (
            <div
                className="max-w-[250px] truncate text-sm font-medium text-[#697586]"
                title={row.reason}
            >
                {row.reason || "N/A"}
            </div>
        ),
    },

    {
        header: "IP Address",
        cell: (row) => (
            <div className="text-sm font-medium text-[#161618]">
                {row.ipAddress || "N/A"}
            </div>
        ),
    },

    {
        header: "Date & Time",
        cell: (row) => (
            <div className="text-xs font-medium leading-[180%] text-[#161618]">
                {formatDate(row.createdAt)}
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
                className="border border-[#DFE1E7]"
                onClick={() => onView(row.id)}
            >
                <Eye className="h-5 w-5 text-[#697586]" />
            </Button>
        ),
    },
];

// ==================== Main Component ====================

export default function AuditLogTable() {
    const [selectedAuditLogId, setSelectedAuditLogId] =
        React.useState<string | null>(null);

    const {
        getAuditLogsList: {
            data,
            isLoading,
            error,
        },
    } = useAuditLogs();

    const auditLogs: AuditLog[] = data ?? [];

    const handleView = (id: string) => {
        setSelectedAuditLogId(id);
    };

    const handleModalChange = (open: boolean) => {
        if (!open) {
            setSelectedAuditLogId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-[#697586]">
                    Loading audit logs...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-red-500">
                    Failed to load audit logs.
                </p>
            </div>
        );
    }

    return (
        <>
            <div>
                <TableToolBar />

                <DataTable
                    
                    columns={getColumns(handleView)}
                    data={auditLogs}
                />
            </div>

            <AuditLogDetailsModal
                id={selectedAuditLogId}
                open={!!selectedAuditLogId}
                onOpenChange={handleModalChange}
            />
        </>
    );
}