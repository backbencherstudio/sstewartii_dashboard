// ===== Root Response =====
export interface VendorListResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: VendorListData;
  }
  
  // ===== Data Layer =====
  export interface VendorListData {
    stats: VendorStats;
    items: VendorItem[];
    pagination: VendorPagination;
  }
  
  // ===== Stats =====
  export interface VendorStats {
    totalVendors: number;
    verifiedVendors: number;
    newThisMonth: number;
    suspendedVendors: number;
  }
  
  // ===== Vendor Item =====
  export interface VendorItem {
    vendorId: string;
    vendorCode: string;
    businessName: string;
    ownerName: string;
    email: string;
  
    status: VendorStatus;
    statusLabel: string;
  
    subscriptionStatus: SubscriptionStatus;
    subscriptionStatusLabel: string;
  
    dateJoined: string; // ISO date
    dateJoinedLabel: string;
  }
  
  // ===== Pagination =====
  export interface VendorPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
  
  // ===== Enums (optional but recommended) =====
  export type VendorStatus = "UNVERIFIED" | "APPROVED" | "SUSPENDED" | "REJECTED";
  
  export type SubscriptionStatus = "ACTIVE" | "INACTIVE" | "PENDING";


  export type RangeType = "day" | "week" | "month" | "year";

export interface VendorOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: VendorOverviewData;
}

export interface VendorOverviewData {
  vendor: VendorOverviewVendor;
  contactInfo: ContactInfo;
  businessProfile: BusinessProfile;
  orderDistribution: OrderDistribution;
  revenueChart: RevenueChart;
  customerEngagement: CustomerEngagement;
  serviceArea: ServiceArea;
  profileViews: ProfileViews;
  favorites: Favorites;
  lastUpdatedAt: string;
}

// ===== Vendor =====
export interface VendorOverviewVendor {
  id: string;
  vendorCode: string;
  businessName: string;
  coverImage: string;

  status: string;
  statusLabel: string;

  kycStatus: string;
  kycStatusLabel: string;

  joinedAt: string;
  joinedAtLabel: string;

  subscriptionStatus: string;

  rating: number;
  reviewCount: number;
  totalRevenue: number;
}

// ===== Contact =====
export interface ContactInfo {
  ownerName: string;
  registeredEmail: string;
  publicEmail: string;
  contactNumber: string;
}

// ===== Business Profile =====
export interface SocialLink {
  id: string;
  url: string;
}

export interface BusinessProfile {
  bio: string;
  cuisines: string[];
  socialLinks: SocialLink[];
}

// ===== Order =====
export interface OrderDistribution {
  totalOrders: number;
  itemsSold: number;
  completed: number;
  cancelled: number;
  incomplete: number;

  completedPercent: number;
  cancelledPercent: number;
  incompletePercent: number;
}

// ===== Revenue Chart =====
export interface RevenueChartItem {
  label: string;
  value: number;
}

export interface RevenueChart {
  range: string;
  total: number;
  currency: string;
  items: RevenueChartItem[];
}

// ===== Customer Engagement =====
export interface CustomerEngagementItem {
  label: string;
  newCustomers: number;
  repeatedCustomers: number;
}

export interface CustomerEngagement {
  range: string;
  totalCustomers: number;
  newCustomers: number;
  repeatedCustomers: number;
  repeatRate: number;
  items: CustomerEngagementItem[];
}

// ===== Service Area =====
export interface ServiceArea {
  address: string;
  latitude: number;
  longitude: number;
  radius: number;
}

// ===== Profile Views =====
export interface ProfileViewsItem {
  label: string;
  value: number;
}

export interface ProfileViews {
  range: string;
  total: number;
  growthPercent: number;
  items: ProfileViewsItem[];
}

// ===== Favorites =====
export interface Favorites {
  count: number;
  recent: any[];
}