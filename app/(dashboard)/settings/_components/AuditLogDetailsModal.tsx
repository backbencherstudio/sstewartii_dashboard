import CustomModal from "@/components/reusable/CustomModal";
import { useAuditLog } from "@/hooks/useSettings";
import { formatDate } from "@/lib/utils";

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
                    {/* Admin */}
                    <div>
                        <p className="text-xs text-[#697586]">Admin</p>
                        <p className="text-sm font-semibold text-[#1A1A2E]">
                            {auditLog.admin?.name}
                        </p>
                        <p className="text-xs text-[#697586]">
                            {auditLog.admin?.email}
                        </p>
                    </div>

                    {/* Action & Entity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-[#697586]">Action</p>
                            <p className="text-sm font-semibold text-[#1A1A2E]">
                                {/* {formatAction(auditLog.action)} */}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-[#697586]">Entity</p>
                            <p className="text-sm font-semibold text-[#1A1A2E]">
                                {auditLog.entity}
                            </p>
                        </div>
                    </div>

                    {/* Entity ID */}
                    {auditLog.entityId && (
                        <div>
                            <p className="text-xs text-[#697586]">
                                Entity ID
                            </p>
                            <p className="break-all text-sm font-medium text-[#1A1A2E]">
                                {auditLog.entityId}
                            </p>
                        </div>
                    )}

                    {/* Reason */}
                    <div>
                        <p className="text-xs text-[#697586]">Reason</p>
                        <p className="text-sm font-medium text-[#1A1A2E]">
                            {auditLog.reason || "N/A"}
                        </p>
                    </div>

                    {/* Changes */}
                    <div>
                        <p className="mb-2 text-xs text-[#697586]">
                            Changes
                        </p>

                        <pre className="overflow-x-auto rounded-lg bg-[#F7F8FA] p-3 text-xs text-[#1A1A2E]">
                            {JSON.stringify(auditLog.changes, null, 2)}
                        </pre>
                    </div>

                    {/* Technical Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-[#697586]">
                                IP Address
                            </p>
                            <p className="text-sm font-medium text-[#1A1A2E]">
                                {auditLog.ipAddress}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-[#697586]">
                                Created At
                            </p>
                            <p className="text-sm font-medium text-[#1A1A2E]">
                                {formatDate(auditLog.createdAt)}
                            </p>
                        </div>
                    </div>

                    {/* User Agent */}
                    <div>
                        <p className="text-xs text-[#697586]">
                            User Agent
                        </p>
                        <p className="break-all text-xs text-[#697586]">
                            {auditLog.userAgent}
                        </p>
                    </div>
                </div>
            )}
        </CustomModal>
    );
}