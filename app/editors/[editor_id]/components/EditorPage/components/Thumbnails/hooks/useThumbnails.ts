import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useGetPageByRoomIdQuery, usePostCreatePageMutation} from "@/shared/api/hooks";
import {Shape} from "@/utils/shapes/shapeTypes";
import {resizeToFit} from "@/utils/helpers/resizeToFit";

export const useThumbnails = (pagesNum: number, roomId: string, width: number, height: number, shapes: Shape[]) => {
    const [currentPage, setCurrentPage] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter();
    const {width: newWidth, height: newHeight, scale} = resizeToFit(width, height, 200)

    const createPage = usePostCreatePageMutation()
    const getPageByRoomId = useGetPageByRoomIdQuery({
        roomId: roomId
    })

    const pages = Array.from({ length: pagesNum }, (_, index) => index);

    const getShapesForPage = (pageNumber: number): Shape[] => {
        const page = getPageByRoomId.data?.data.find(p => p.pageNumber === pageNumber);
        return page?.shapes || [];
    };

    const setPage = async (page: number) => {
        await createPage.mutateAsync({
            params: {
                pageNumber: currentPage,
                roomId: roomId,
                htmlContent: "<></>",
                shapes: shapes
            }
        })

        setCurrentPage(page);

        const params = new URLSearchParams(searchParams.toString());

        if (page === 0) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        const pageParam = searchParams.get('page');
        if (pageParam) {
            const pageNumber = parseInt(pageParam, 10);
            if (!isNaN(pageNumber) && pageNumber >= 0 && pageNumber < pagesNum) {
                setCurrentPage(pageNumber);
            } else {
                setCurrentPage(0);
            }
        } else {
            setCurrentPage(0);
        }
    }, [searchParams, pagesNum]);

    return {
        state: { currentPage, getPageByRoomId, pages, newHeight, newWidth, scale },
        functions: { getShapesForPage, setPage }
    }
}