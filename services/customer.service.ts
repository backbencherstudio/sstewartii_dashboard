import { useGetCustomerById } from "@/hooks/useCustomers";
import api from "@/lib/axios";

export const CustomerService = {
    async getCustomers() {
        const { data } = await api.get<any>("/admin/customer-list");
        return data;
    },
    async getCustomerById(id: string) {
        const { data } = await api.get<any>(`/admin/customer/${id}`);
        return data;
    },
    async createCustomer(customer: any) {
        const { data } = await api.post<any>("/admin/customer-create", customer);
        return data;
    },
    async updateCustomer(id: string, customer: any) {
        const { data } = await api.put<any>(`/admin/customer-update/${id}`, customer);
        return data;
    },

    async getCustomerReports(){
        const {data} = await api.get<any>(`/admin/customer/report`);
        return data;
    },

    async getCustomerReportById(id: string){
        const {data} = await api.get<any>(`/admin/customer/${id}/reports`);
        return data;
    },

    async getCustomerReportDetails(id: string){
        const {data} = await api.get<any>(`/admin/customers/${id}/reports/vendors`);
        return data;
    }
}
