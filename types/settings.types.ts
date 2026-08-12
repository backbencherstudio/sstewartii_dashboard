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
  export interface AdminLog {
    id: string;
    adminId: string;
    action: string;
    entity: string;
    entityId: string | null;
    changes: {
      logoutTime?: string;
      to?: string;
      from?: string;
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
  }
  
  export interface AdminLogsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: AdminLog[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }

  export interface SingleAuditLogResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
      id: string;
      adminId: string;
      action: string;
      entity: string;
      entityId: string | null;
      changes: {
        logoutTime?: string;
        to?: string;
        from?: string;
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
  }