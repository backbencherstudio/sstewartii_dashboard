

import { redirect } from "next/navigation";
import { cookie } from "@/lib/cookie";



const useAuth = () => {
    const logout = () => {
        cookie.remove('auth-token');
        redirect('/login');
    }

    return { logout };
};

export default useAuth;
