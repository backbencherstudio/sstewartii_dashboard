export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }


  export interface UpdateProfilePayload {
    name?: string;
    avatar?: File | Blob;
  }