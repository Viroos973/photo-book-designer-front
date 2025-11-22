import {usePathname} from "next/navigation";
import {useAuth} from "@/shared/contexts";
import {useProject} from "@/shared/contexts/project";

export const useHeader = () => {
    const pathname = usePathname();
    const { authenticated, role } = useAuth()
    const { projectName, projectType, setProjectType } = useProject()

    const isActive = (link: string) => {
        return pathname === link;
    }

    return {
        state: { authenticated, role, projectName, projectType },
        functions: { isActive, setProjectType }
    }
}