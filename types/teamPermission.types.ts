export interface Permission {
  id: string;
  name: string;
  action: string | null;
  subject: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    permissions: Permission[];
    grouped?: Record<string, Permission[]>;
    total: number;
  };
}

export interface Role {
  id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  isSystem?: boolean;
  usersCount?: number;
  permissionsCount?: number;
  permissions?: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface RolesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Role[];
}

export interface SingleRoleResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Role;
}

export interface RolePayload {
  name: string;
  permissionIds: string[];
}

