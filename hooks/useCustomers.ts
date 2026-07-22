import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomerService } from "@/services/customer.service";

export const useGetAllCustomers = () => {
    return useQuery({
        queryKey: ["customers"],
        queryFn: () => CustomerService.getCustomers(),
    });
}

export const useGetCustomerById = (id: string) => {
    return useQuery({
        queryKey: ["customer", id],
        queryFn: () => CustomerService.getCustomerById(id),
    });
}

export const useCreateCustomer = (customer: unknown) => {
    return useMutation({
        mutationFn: () => CustomerService.createCustomer(customer),
    });
}

export const useUpdateCustomer = (id: string, customer: unknown) => {
    return useMutation({
        mutationFn: () => CustomerService.updateCustomer(id, customer),
    });
}

export const useGetCustomerReports = () => {
    return useQuery({
        queryKey: ['customer-reports'],
        queryFn: () => CustomerService.getCustomerReports(),
    });
}

export const useGetCustomerReportById = (id: string) => {
    return useQuery({
        queryKey: ['customer-report', id],
        queryFn: () => CustomerService.getCustomerReportById(id),
    });
}

export const useGetCustomerReportDetails = (id: string, enabled = true) => {
    return useQuery({
        queryKey: ['customer-report-details', id],
        queryFn: () => CustomerService.getCustomerReportDetails(id),
        enabled: Boolean(id) && enabled,
    });
}