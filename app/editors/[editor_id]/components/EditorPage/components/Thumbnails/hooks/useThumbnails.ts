import {useEffect, useState} from "react";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useGetPageByRoomIdQuery} from "@/shared/api/hooks";
import {Shape} from "@/utils/shapes/shapeTypes";

export const useThumbnails = (width: number, height: number, scale: number, pagesNum: number) => {
    const [currentPage, setCurrentPage] = useState(0);
    const { editor_id } = useParams<{ editor_id: string }>();
    const searchParams = useSearchParams();
    const router = useRouter();

    const getPageByRoomId = useGetPageByRoomIdQuery({
        roomId: editor_id
    })

    const miniWidth = width * scale;
    const miniHeight = height * scale;

    const pages = Array.from({ length: pagesNum }, (_, index) => index);

    const getShapesForPage = (pageNumber: number): Shape[] => {
        const page = getPageByRoomId.data?.data.find(p => p.pageNumber === pageNumber);
        return page?.shapes || [];
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (currentPage === 0) {
            params.delete('page');
        } else {
            params.set('page', currentPage.toString());
        }

        const newUrl = `?${params.toString()}`;
        router.replace(newUrl, { scroll: false });
    }, [currentPage]);

    return {
        state: { miniWidth, miniHeight, currentPage, getPageByRoomId, pages },
        functions: { setCurrentPage, getShapesForPage }
    }
}