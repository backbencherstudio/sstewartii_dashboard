export type VendorVerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

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
  type: "BUSINESS_LICENSE" | "HEALTH_PERMIT" | "INSURANCE_PROOF" | string;
  label: string;
  fileName: string;
  fileUrl: string;
  status: "ACTIVE" | "INACTIVE" | string;
  expirationDate?: string;
  expirationDateLabel?: string;
}

export interface VendorDetails {
  id: string;
  vendorCode: string;
  businessName: string;
  coverImage?: string;
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

export interface NameComparison {
  verifiedIdName: string;
  permitHolderName: string;
  businessName: string;
}

export interface CredentialReview {
  status: "PENDING" | "APPROVED" | "REJECTED" | "NEEDS_REVIEW" | string;
}

export interface BusinessDocumentReview {
  status: "PENDING" | "APPROVED" | "REJECTED" | "NEEDS_REVIEW" | string;
  uploaded: boolean;
}

export interface VerificationReviewHistoryItem {
  id?: string;
  kind?: string;
  status?: string;
  reviewerId?: string | null;
  result?: string | null;
  reason?: string | null;
  reviewedAt?: string | null;
  [key: string]: unknown;
}

export interface VendorVerificationData {
  verificationId: string;
  vendorId: string;
  vendorCode: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  submittedAt: string;
  submittedAtLabel: string;
  permitHolderName: string;
  verifiedIdName: string;
  nameComparison: NameComparison;
  credentialReview: CredentialReview;
  businessDocumentReview: BusinessDocumentReview;
  reviewHistory: VerificationReviewHistoryItem[];
  credentialNumber: string;
  issuingAuthority: string;
  credentialState: string;
  credentialJurisdiction: string;
  expirationDate: string;
  permitHolderNameMatchesVerifiedId: boolean;
  manualReviewRequired: boolean;
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

export type VerificationReviewStatus = "APPROVED" | "NEEDS_REVIEW" | "REJECTED";

export type VerificationReviewKind = "credential" | "business-document";

export interface VerificationReviewPayload {
  status: VerificationReviewStatus;
  result: string;
  reason: string;
}

export interface VerificationReviewResponse {
  verificationId: string;
  vendorId: string;
  status: string;
  reviewedAt: string;
  message: string;
}

// =============================================== NID / KYC VERIFICATIONS ========================================

export type NidKycStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED" | string;

export type NidDocumentType = "NATIONAL_ID" | string;

export type NidSelfiePose = "FRONT" | "LEFT" | "RIGHT" | string;

export interface VendorNidOwner {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface VendorNidDocument {
  type: NidDocumentType;
  documentNumber: string;
  frontImageUrl: string;
  backImageUrl: string;
}

export interface VendorNidSelfieImage {
  pose: NidSelfiePose;
  imageUrl: string;
  uploadedAt: string;
}

export interface VendorNidSelfie {
  images: VendorNidSelfieImage[];
}

export interface VendorNidKycProfile {
  document: VendorNidDocument;
  selfie: VendorNidSelfie;
  rejectionReason: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  updatedAt: string;
  verifiedAt: string | null;
  verifiedIdName: string;
}

export interface VendorNidVerificationDetails {
  id: string;
  vendorCode: string;
  businessName: string;
  publicEmail: string;
  contactNumber: string;
  coverImage: string | null;
  kycStatus: NidKycStatus;
  createdAt: string;
  updatedAt: string;
  owner: VendorNidOwner;
  kycProfile: VendorNidKycProfile;
}

export interface VendorNidVerificationDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: VendorNidVerificationDetails;
}
