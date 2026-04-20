import {Shape} from "@/utils/shapes/shapeTypes";
import {useMiniPage} from "@/app/editors/[editor_id]/components/MiniPage/hooks/useMiniPage";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

interface MiniPageProps extends ComponentProps<'div'> {
    shapes: Shape[] | null,
    scale: number,
    width: number,
    height: number,
    pageNumber: number,
    isActive?: boolean,
    becomeActive?: () => void,
    isLast?: boolean
}

const MiniPage = ({className, shapes, scale, width, height, pageNumber, isActive = false, becomeActive = () => {}, isLast = false}: MiniPageProps) => {
    const { state, containerRef } = useMiniPage(shapes, scale, width, height, isActive);

    return (
        <div ref={containerRef} style={{ width, height: height + 28 }} className="flex flex-col gap-2">
            {state.imageUrl ? (
                <Button variant={"ghost"}
                        className={cn(`p-0 h-auto w-auto rounded-none ${isActive && "border-2 border-blue-500"}`, className)}
                        onClick={becomeActive}>
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
                {pageNumber == 0 || isLast ? "Обложка" : pageNumber == -1 ? "Форзац" : pageNumber}
            </p>
        </div>
    )
}

export default MiniPage