import {useContext} from "react";
import {AuthContext} from "@/shared/contexts";

export const useAuth = () => {
    return useContext(AuthContext);
};