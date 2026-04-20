import {useParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {useGetPageByRoomIdQuery, useGetRoomByIdQuery} from "@/shared/api/hooks";
import {DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {Shape} from "@/utils/shapes/shapeTypes";
import {arraySwap} from "@dnd-kit/sortable";
import {resizeToFit} from "@/utils/helpers/resizeToFit";

interface SpreadPage {
    id: string,
    shapes: Shape[] | null,
    pageNumber: number,
    width: number,
    height: number,
    scale: number
}

export const useMovingPage = () => {
    const { editor_id } = useParams<{ editor_id: string }>();
    const [pages, setPages] = useState<SpreadPage[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));
    const getPageByRoomId = useGetPageByRoomIdQuery({
        roomId: editor_id
    })
    const getRoomById = useGetRoomByIdQuery({
        roomId: editor_id
    })

    useEffect(() => {
        if (getPageByRoomId.isSuccess && getPageByRoomId.data?.data && getRoomById.isSuccess && getRoomById.data?.data) {
            const {width: newWidth, height: newHeight} = resizeToFit(getRoomById.data.data.widthTemplate, getRoomById.data.data.heightTemplate, 700)
            const {width: pageWidth, height: pageHeight, scale} = resizeToFit(newWidth, newHeight, 200)

            const pagesMap = new Map();
            getPageByRoomId.data.data.forEach(p => {
                pagesMap.set(p.pageNumber, p.shapes || []);
            });

            const flatPages = [];
            for (let i = 0; i < getRoomById.data.data.pagesNum + 2; i++) {
                flatPages.push({
                    id: `page-${i}`,
                    pageNumber: i,
                    shapes: pagesMap.get(i) || [],
                    width: pageWidth,
                    height: pageHeight,
                    scale: scale
                });
            }

            flatPages.splice(1, 0, {
                id: `special-page-1`,
                pageNumber: -1,
                shapes: [],
                width: pageWidth,
                height: pageHeight,
                scale: scale
            });

            const lastIndex = flatPages.length;
            flatPages.splice(lastIndex - 1, 0, {
                id: `special-page-2`,
                pageNumber: -1,
                shapes: [],
                width: pageWidth,
                height: pageHeight,
                scale: scale
            });

            setPages(flatPages);
        }
    }, [getPageByRoomId.isSuccess, getPageByRoomId.data, getRoomById.isSuccess, getRoomById.data]);

    const handleDragStart = ({active}: DragStartEvent) => {
        setActiveId(String(active.id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = pages.findIndex(p => p.id === active.id);
            const newIndex = pages.findIndex(p => p.id === over.id);
            const swapped = arraySwap(pages, oldIndex, newIndex);

            let pageCounter = 0;

            const newPages = swapped.map(page => {
                if (page.pageNumber === -1) return page;

                return {
                    ...page,
                    pageNumber: pageCounter++
                };
            });

            setPages(newPages);
        }
        setActiveId(null);
    };

    const activePage = useMemo(() => {
        if (!activeId) return null;
        return pages.find(p => p.id === activeId);
    }, [pages, activeId]);

    const lastPageNum = pages.length - 1;

    const spreads = useMemo(() => {
        const innerPages = pages.slice(1, -1);
        const result = [];
        for (let i = 0; i < innerPages.length; i += 2) {
            result.push({
                leftPage: innerPages[i],
                rightPage: innerPages[i + 1]
            });
        }
        return result;
    }, [pages]);

    return {
        state: { activePage, activeId, sensors, pages, lastPageNum, spreads },
        functions: { handleDragStart, handleDragEnd }
    }
}