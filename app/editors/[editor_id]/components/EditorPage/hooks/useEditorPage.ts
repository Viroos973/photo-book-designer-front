import {useEffect, useState} from "react";
import {Shape} from "@/utils/shapes/shapeTypes";
import {useParams, useSearchParams} from "next/navigation";
import {useGetRoomByIdQuery} from "@/shared/api/hooks";
import {useAuth} from "@/shared/contexts";
import {useGetPageByNumberQuery} from "@/shared/api/hooks/useGetPageByNumberQuery";

export const useEditorPage = () => {
    const { editor_id } = useParams<{ editor_id: string }>();
    const searchParams = useSearchParams();
    const {setProjectName} = useAuth();
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const [shapes, setShapes] = useState<Shape[]>([]);

    const pageParam = searchParams.get('page');
    const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;

    const getRoomById = useGetRoomByIdQuery({
        roomId: editor_id
    })

    const getPageByNumber = useGetPageByNumberQuery({
        roomId: editor_id,
        pageNumber: pageNumber
    })

    useEffect(() => {
        if (getRoomById.isSuccess && getRoomById.data?.data.name) {
            setProjectName(getRoomById.data.data.name);
        }
    }, [getRoomById.isSuccess, getRoomById.data]);

    useEffect(() => {
        if (getPageByNumber.isSuccess && getPageByNumber.data?.data?.shapes) {
            setShapes(getPageByNumber.data.data.shapes);
        } else {
            setShapes([]);
        }
    }, [getPageByNumber.isSuccess, getPageByNumber.data]);

    return {
        state: { selectedTool, getRoomById, shapes, editor_id },
        functions: { setSelectedTool, setShapes }
    }
}