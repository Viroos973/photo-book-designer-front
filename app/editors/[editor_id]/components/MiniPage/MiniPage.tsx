import {Shape} from "@/utils/shapes/shapeTypes";
import {useMiniPage} from "@/app/editors/[editor_id]/components/MiniPage/hooks/useMiniPage";
import Image from "next/image";
import {Button} from "@/components/ui/button";

interface MiniPageProps {
    shapes: Shape[],
    scale: number,
    width: number,
    height: number,
    pageNumber: number,
    isActive: boolean,
    becomeActive: () => void
}

const MiniPage = ({shapes, width, height, pageNumber, isActive, becomeActive, scale}: MiniPageProps) => {
    const { state, containerRef } = useMiniPage(shapes, scale, width, height, isActive);

    return (
        <div ref={containerRef} style={{ width, height: height + 28 }} className="flex flex-col gap-2">
            {state.imageUrl ? (
                <Button variant={"ghost"} className={`p-0 h-auto w-auto rounded-none ${isActive && "border-2 border-blue-500"}`} onClick={becomeActive}>
                    <Image src={state.imageUrl}
                           width={width}
                           height={height}
                           alt="thumbnail"
                           loading="lazy"
                           className="border border-gray-400 bg-white" />
                </Button>
            ) : (
                <div
                    style={{
                        width,
                        height,
                        border: '1px solid #9ca3af',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                        fontSize: '12px'
                    }}
                >
                    Loading...
                </div>
            )}
            <p className="text-center text-sm text-gray-600">
                {pageNumber == 0 ? "Обложка" : pageNumber}
            </p>
        </div>
    )
}

export default MiniPage