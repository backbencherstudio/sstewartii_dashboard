import CustomModal from "@/components/reusable/CustomModal";
import { useAuditLog } from "@/hooks/useSettings";
import { formatDate } from "@/lib/utils";

const formatAction = (action?: string | null) => {
    if (!action) return "N/A";
    return action
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function AuditLogDetailsModal({
    id,
    open,
    onOpenChange,
}: {
    id: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const {
        data: auditLog,
        isLoading,
        error,
    } = useAuditLog(id || "");

    const actor = auditLog?.admin || auditLog?.actorUser;
    const entityDisplay = auditLog?.entity || auditLog?.entityType || "N/A";

    return (
        <CustomModal
            open={open}
            onOpenChange={onOpenChange}
            title="Audit Log Details"
            size="md"
        >
            {isLoading && (
                <div className="py-10 text-center text-sm text-[#697586]">
                    Loading audit log...
                </div>
            )}

            {error && (
                <div className="py-10 text-center text-sm text-red-500">
                    Failed to load audit log.
                </div>
            )}

            {auditLog && (
                <div className="space-y-5">
                    {/* Admin / Actor User */}
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-[#697586] font-medium">Actor / Admin</p>
                            <p className="text-sm font-semibold text-[#1A1A2E]">
                                {actor?.name || auditLog?.actorNameSnapshot || "System"}
                            </p>
                            {actor?.email && (
                                <p className="text-xs text-[#697586]">{actor.email}</p>
                            )}
                        </div>
                        {auditLog?.result && (
                            <span
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase ${
                                    auditLog.result === "SUCCESS"
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                        : "bg-rose-50 text-rose-600 border border-rose-200"
                                }`}
                            >
                                {auditLog.result}
                            </span>
                        )}
                    </div>

                    {/* Action & Entity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-[#697586]">Action</p>
                            <span className="inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#EEF2FF] text-[#4F46E5] uppercase">
                                {formatAction(auditLog.action)}
                            </span>
                        </div>

                        <div>
                            <p className="text-xs text-[#697586]">Entity / Target</p>
                            <p className="mt-1 text-sm font-semibold text-[#1A1A2E]">
                                {entityDisplay}
                            </p>
                        </div>
                    </div>

                    {/* Entity ID */}
                    {auditLog.entityId && (
                        <div>
                            <p className="text-xs text-[#697586]">Entity ID</p>
                            <p className="break-all text-xs font-mono bg-gray-50 p-2 rounded border border-gray-100 text-[#1A1A2E] mt-1">
                                {auditLog.entityId}
                            </p>
                        </div>
                    )}

                    {/* Description or Reason */}
                    {(auditLog.reason || auditLog.description) && (
                        <div>
                            <p className="text-xs text-[#697586]">Reason / Description</p>
                            <p className="text-sm font-medium text-[#1A1A2E] mt-0.5">
                                {auditLog.reason || auditLog.description || "N/A"}
                            </p>
                        </div>
                    )}

                    {/* Changes or Metadata */}
                    {((auditLog.changes && Object.keys(auditLog.changes).length > 0) || auditLog.metadata) && (
                        <div>
                            <p className="mb-2 text-xs text-[#697586] font-medium">
                                Payload / Changes
                            </p>
                            <pre className="overflow-x-auto rounded-lg bg-[#F7F8FA] p-3 text-xs text-[#1A1A2E] max-h-48 border border-gray-100">
                                {JSON.stringify(auditLog.changes || auditLog.metadata, null, 2)}
                            </pre>
                        </div>
                    )}

                    {/* Technical Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-[#697586]">IP Address</p>
                            <p className="text-sm font-medium text-[#1A1A2E]">
                                {auditLog.ipAddress || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-[#697586]">Created At</p>
                            <p className="text-sm font-medium text-[#1A1A2E]">
                                {formatDate(auditLog.createdAt)}
                            </p>
                        </div>
                    </div>

                    {/* User Agent */}
                    {auditLog.userAgent && (
                        <div>
                            <p className="text-xs text-[#697586]">User Agent</p>
                            <p className="break-all text-xs text-[#697586] bg-gray-50 p-2 rounded border border-gray-100 mt-1">
                                {auditLog.userAgent}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </CustomModal>
    );
}