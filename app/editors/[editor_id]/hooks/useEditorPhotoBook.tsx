import {useParams} from "next/navigation";
import {useEffect} from "react";
import {useAuth} from "@/shared/contexts";
import {useProject} from "@/shared/contexts/project";
import {ROLES} from "@/utils/constants/roles";

export const useEditorPhotoBook = () => {
    const { editor_id } = useParams<{ editor_id: string }>()
    const { setMyRole } = useAuth()
    const { projectType } = useProject()

    useEffect(() => {
        setMyRole(ROLES.CREATOR)
    }, [editor_id])

    return {
        state: { projectType }
    }
}