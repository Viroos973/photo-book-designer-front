import {usePathname} from "next/navigation";
import {useAuth} from "@/shared/contexts";

export const useHeader = () => {
    const pathname = usePathname();
    const { authenticated, role, projectName } = useAuth()

    const isActive = (link: string) => {
        return pathname === link;
    }

    return {
        state: { authenticated, role, projectName },
        functions: { isActive }
    }
}