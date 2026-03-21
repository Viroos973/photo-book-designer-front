import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import {useAuth} from "@/shared/contexts";
import {useEffect, useState} from "react";
import {PROJECT_TYPES} from "@/utils/constants/projectTypes";
import {ROLES} from "@/utils/constants/roles";
import {ROUTES} from "@/utils/constants/routes";

export const useHeader = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { editor_id } = useParams<{ editor_id: string }>()
    const [projectType, setProjectType] = useState(PROJECT_TYPES.EDITOR);
    const [isOpen, setIsOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const { authenticated, role, projectName, setMyRole } = useAuth();
    const initialProjectType = searchParams.get('projectType') || PROJECT_TYPES.EDITOR;

    const handleOpenLogin = () => {
        setIsRegister(false)
        setIsOpen(true);
    }

    const handleOpenRegister = () => {
        setIsRegister(true)
        setIsOpen(true);
    }

    useEffect(() => {
        if (role === ROLES.USER) return

        const params = new URLSearchParams(searchParams.toString());

        if (projectType === PROJECT_TYPES.EDITOR) {
            params.delete('projectType');
        } else {
            params.set('projectType', projectType);
        }

        const newUrl = `?${params.toString()}`;
        router.replace(newUrl, { scroll: false });
    }, [projectType]);

    useEffect(() => {
        if (pathname === ROUTES.EDITORS.$ID(editor_id)) return

        setMyRole(ROLES.USER)
    }, [pathname]);

    return {
        state: { authenticated, role, projectName, initialProjectType, isOpen, isRegister },
        functions: { setProjectType, setIsOpen, setIsRegister, handleOpenLogin, handleOpenRegister }
    }
}