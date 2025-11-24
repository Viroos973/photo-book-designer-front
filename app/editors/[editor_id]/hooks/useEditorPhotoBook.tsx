import {useParams, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {useAuth} from "@/shared/contexts";
import {ROLES} from "@/utils/constants/roles";
import {PROJECT_TYPES} from "@/utils/constants/projectTypes";

export const useEditorPhotoBook = () => {
    const { setMyRole } = useAuth()
    const searchParams = useSearchParams();
    const { editor_id } = useParams<{ editor_id: string }>()
    const projectType = searchParams.get('projectType') || PROJECT_TYPES.EDITOR;

    useEffect(() => {
        setMyRole(ROLES.CREATOR)
    }, [editor_id])

    return {
        state: { projectType }
    }
}