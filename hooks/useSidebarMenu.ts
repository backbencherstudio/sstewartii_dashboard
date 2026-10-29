import { authService } from "@/services/auth.service";
import { SidebarMenuItemData } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";

export const useSidebarMenu = () => {
  return useQuery<SidebarMenuItemData[]>({
    queryKey: ["sidebar-menu"],
    queryFn: async () => {
      const menu = await authService.getSidebarMenu();
      return menu;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

