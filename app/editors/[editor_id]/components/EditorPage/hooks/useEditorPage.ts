import {useEffect, useState} from "react";
import {Shape} from "@/utils/shapes/shapeTypes";
import {useParams, useSearchParams} from "next/navigation";
import {useGetRoomByIdQuery} from "@/shared/api/hooks";
import {useAuth} from "@/shared/contexts";

export const useEditorPage = () => {
    const { editor_id } = useParams<{ editor_id: string }>();
    const searchParams = useSearchParams();
    const {setProjectName} = useAuth();
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [shapes, setShapes] = useState<Shape[]>([]);

    const getRoomById = useGetRoomByIdQuery({
        roomId: editor_id
    })

    useEffect(() => {
        if (getRoomById.isSuccess && getRoomById.data?.data.name) {
            setProjectName(getRoomById.data.data.name);
        }
    }, [getRoomById.isSuccess, getRoomById.data, setProjectName]);

    useEffect(() => {
        const pageParam = searchParams.get('page');
        console.log(pageParam)
        setShapes([])
    }, [searchParams]);

    return {
        state: { selectedTool, getRoomById, shapes, editor_id },
        functions: { setSelectedTool, setShapes }
    }
}