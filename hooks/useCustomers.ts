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

export const useCreateCustomer = (customer: any) => {
    return useMutation({
        mutationFn: () => CustomerService.createCustomer(customer),
    });
}

export const useUpdateCustomer = (id: string, customer: any) => {
    return useMutation({
        mutationFn: () => CustomerService.updateCustomer(id, customer),
    });
}   