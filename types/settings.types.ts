export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }


  export interface UpdateProfilePayload {
    name?: string;
    avatar?: File | Blob;
  }


  // ============ Audit Log =====================
  export interface AuditLogActorUser {
    id: string;
    name: string;
    email: string;
    role?: string;
  }

  export interface AuditLogAdmin {
    id: string;
    name: string;
    email: string;
  }

  export interface AdminLog {
    id: string;
    adminId?: string | null;
    actorUserId?: string | null;
    actorNameSnapshot?: string | null;
    action: string;
    entity?: string | null;
    entityType?: string | null;
    entityId?: string | null;
    description?: string | null;
    metadata?: Record<string, unknown> | null;
    result?: "SUCCESS" | "FAILED" | "PENDING" | string;
    changes?: {
      logoutTime?: string;
      to?: string;
      from?: string;
      [key: string]: unknown;
    };
    reason?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: string;
    updatedAt?: string;
    admin?: AuditLogAdmin | null;
    actorUser?: AuditLogActorUser | null;
  }
  
  export interface AuditLogPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
  }

  export interface AdminLogsData {
    items: AdminLog[];
    pagination?: AuditLogPagination;
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
  }

  export interface AdminLogsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: AdminLogsData | AdminLog[] | {
      items?: AdminLog[];
      logs?: AdminLog[];
      auditLogs?: AdminLog[];
      pagination?: AuditLogPagination;
      total?: number;
      page?: number;
      limit?: number;
      totalPages?: number;
    };
    meta?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    pagination?: AuditLogPagination;
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  }

  export interface SingleAuditLogResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: AdminLog;
  }

  export interface AuditLogStaffMember {
    id: string;
    name: string;
    email: string;
    role?: string;
  }

  export interface AuditLogStaffResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: AuditLogStaffMember[];
  }

  export interface AuditLogActionsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
      actions: string[];
    };
  }

  export interface AuditLogActionCount {
    action: string;
    count: number;
  }

  export interface AuditLogEntityCount {
    entity: string;
    count: number;
  }

  export interface AuditLogSummaryData {
    total: number;
    byAction: AuditLogActionCount[];
    byEntity: AuditLogEntityCount[];
    recentActivity: AdminLog[];
  }

  export interface AuditLogSummaryResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: AuditLogSummaryData;
  }

  export interface AuditLogQueryParams {
    page?: number;
    limit?: number;
    actorUserId?: string;
    action?: string;
    entityType?: string;
    entityId?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }