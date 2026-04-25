import {useGetRoomByIdQuery, useGetSpreadQuery} from "@/shared/api/hooks";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {Shape} from "@/utils/shapes/shapeTypes";
import {resizeToFit} from "@/utils/helpers/resizeToFit";

export const useResultPage = () => {
    const { editor_id } = useParams<{ editor_id: string }>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [shapes, setShapes] = useState<Shape[]>([]);

    const spreadParam = searchParams.get('spread');
    const spreadNumber = spreadParam ? parseInt(spreadParam, 10) : 0;

    const getRoomById = useGetRoomByIdQuery({
        roomId: editor_id
    })

    const spreadCount = useMemo(() => {
        if (getRoomById.isSuccess && getRoomById.data?.data.pagesNum) return ((getRoomById.data.data.pagesNum + 4) / 2)
        return 10
    }, [getRoomById.isSuccess, getRoomById.data]);

    const {width, height} = useMemo(() => {
        if (getRoomById.isSuccess && getRoomById.data?.data.heightTemplate && getRoomById.data?.data.widthTemplate) {
           return resizeToFit(getRoomById.data?.data.widthTemplate, getRoomById.data.data.heightTemplate, 700)
        }
        return {width: 200, height: 100}
    }, [getRoomById.isSuccess, getRoomById.data]);

    const getSpread = useGetSpreadQuery({
        roomId: editor_id,
        spreadNumber: spreadNumber
    })

    const handleChangeSpread = (spread: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (spread <= 0 || spread > spreadCount) {
            params.delete('spread');
        } else {
            params.set('spread', spread.toString());
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }

    useEffect(() => {
        if (!getRoomById.isSuccess || !getRoomById.data?.data.widthTemplate || !getSpread.isSuccess) return

        const {width: pageWidth} = resizeToFit(getRoomById.data.data.widthTemplate, getRoomById.data.data.heightTemplate, 700)

        if (getSpread.data?.data?.pageOne && getSpread.data?.data?.pageTwo) {
            const shapesOnTwoPage = getSpread.data.data.pageTwo.shapes.map(shape => ({
                ...shape,
                x: shape.x + pageWidth
            } as Shape))

            const dividerLine: Shape = {
                id: `divider-${spreadNumber}`,
                type: 'line',
                x: pageWidth,
                y: 0,
                isDragging: false,
                props: {
                    points: [0, 0, 0, getRoomById.data.data.heightTemplate || 800],
                    stroke: "#9ca3af",
                    strokeWidth: 2,
                    dash: [10, 10],
                    lineCap: 'round',
                    lineJoin: 'round',
                    opacity: 0.6
                }
            };

            setShapes([...getSpread.data.data.pageOne.shapes, dividerLine, ...shapesOnTwoPage])
        } else if (!getSpread.data?.data?.pageOne && getSpread.data?.data?.pageTwo) {
            setShapes([...getSpread.data.data.pageTwo.shapes])
        } else if (getSpread.data?.data?.pageOne && !getSpread.data?.data?.pageTwo) {
            setShapes([...getSpread.data.data.pageOne.shapes])
        }
    }, [getRoomById.isSuccess, getSpread.isSuccess, getRoomById.data, getSpread.data]);

    return {
        state: { width, height, shapes, spreadNumber },
        functions: { handleChangeSpread, setShapes }
    }
}