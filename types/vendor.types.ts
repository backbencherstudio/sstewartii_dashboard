export type VendorVerificationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface VerificationDocuments {
  businessLicense: boolean;
  healthPermit: boolean;
  insuranceProof: boolean;
}

export interface VendorVerification {
  verificationId: string;
  vendorId: string;
  vendorCode: string;
  vendorName: string;
  publicEmail: string;
  contactNumber: string;
  status: VendorVerificationStatus;
  documents: VerificationDocuments;
  submittedAt: string;
  submissionDateLabel: string;
}

export interface VendorVerificationStats {
  totalPending: number;
  rejectedVerifications: number;
  avgReviewTimeDays: number;
  rejectionRate: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface VendorVerificationList {
  stats: VendorVerificationStats;
  pagination: PaginationMeta;
  items: VendorVerification[];
}

export interface VendorVerificationQueryParams {
  status?: VendorVerificationStatus;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest";
}



export interface DocumentItem {
    serial: string;
    type: 'BUSINESS_LICENSE' | 'HEALTH_PERMIT' | 'INSURANCE_PROOF' | string;
    label: string;
    fileName: string;
    fileUrl: string;
    status: 'ACTIVE' | 'INACTIVE' | string;
  }
  
  export interface VendorDetails {
    id: string;
    vendorCode: string;
    businessName: string;
    coverImage: string;
    ownerName: string;
    ownerEmail: string;
    publicEmail: string;
    contactNumber: string;
    joinedAt: string;
    joinedAtLabel: string;
  }
  
  export interface VerificationDecision {
    canApprove: boolean;
    canReject: boolean;
    message: string;
  }
  
  export interface VendorVerificationData {
    verificationId: string;
    vendorId: string;
    vendorCode: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | string;
    submittedAt: string;
    submittedAtLabel: string;
    documents: DocumentItem[];
    vendor: VendorDetails;
    decision: VerificationDecision;
  }
  
  export interface VendorVerificationResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: VendorVerificationData;
  }