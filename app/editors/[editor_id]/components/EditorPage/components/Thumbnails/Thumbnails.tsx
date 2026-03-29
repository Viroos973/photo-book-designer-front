import {useThumbnails} from "./hooks/useThumbnails";
import {Shape} from "@/utils/shapes/shapeTypes";
import MiniPage from "@/app/editors/[editor_id]/components/MiniPage/MiniPage";

interface ThumbnailsProps {
    scale?: number,
    width: number,
    height: number,
    pagesNum: number,
    shapes: Shape[]
}

export const Thumbnails = ({width, height, pagesNum, shapes, scale = 0.3}: ThumbnailsProps) => {
    const { state, functions } = useThumbnails(width, height, scale, pagesNum);

    return (
        <div className="flex flex-col border-l p-6 gap-4 overflow-y-auto" style={{ height: 'calc(100vh - 80px)' }}>
            {state.pages.map((pageNumber) => (
                <MiniPage key={pageNumber} width={state.miniWidth} height={state.miniHeight} scale={scale}
                          pageNumber={pageNumber} isActive={state.currentPage == pageNumber}
                          becomeActive={() => functions.setCurrentPage(pageNumber)}
                          shapes={state.currentPage == pageNumber ? shapes : functions.getShapesForPage(pageNumber)} />
            ))}
        </div>
    )
}