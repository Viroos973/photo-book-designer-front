import {useThumbnails} from "./hooks/useThumbnails";
import {Shape} from "@/utils/shapes/shapeTypes";
import MiniPage from "@/app/editors/[editor_id]/components/MiniPage/MiniPage";

interface ThumbnailsProps {
    width: number,
    height: number,
    pagesNum: number,
    shapes: Shape[],
    roomId: string
}

export const Thumbnails = ({width, height, pagesNum, shapes, roomId}: ThumbnailsProps) => {
    const { state, functions } = useThumbnails(pagesNum, roomId, width, height, shapes);

    return (
        <div className="flex flex-col border-l p-6 gap-4 overflow-y-auto" style={{ height: 'calc(100vh - 80px)' }}>
            {state.pages.map((pageNumber) => (
                <MiniPage key={pageNumber} width={state.newWidth} height={state.newHeight} scale={state.scale}
                          pageNumber={pageNumber} isActive={state.currentPage == pageNumber}
                          becomeActive={() => functions.setPage(pageNumber)}
                          shapes={state.currentPage == pageNumber ? shapes : functions.getShapesForPage(pageNumber)} />
            ))}
        </div>
    )
}