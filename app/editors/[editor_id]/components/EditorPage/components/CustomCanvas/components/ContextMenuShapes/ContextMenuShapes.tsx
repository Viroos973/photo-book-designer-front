import {Dispatch, RefObject, SetStateAction} from "react";
import {BringToFront, ClipboardCopy, Edit, Scissors, SendToBack, Trash2} from "lucide-react"
import {ContextMenuProps, Shape} from "@/utils/shapes/shapeTypes";
import {
    useContextMenuShapes
} from "@/app/editors/[editor_id]/components/EditorPage/components/CustomCanvas/components/ContextMenuShapes/hooks/useContextMenuShapes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ContextMenuShapesProps {
    contextMenuState: ContextMenuProps,
    clipboardRef: RefObject<Shape | null>,
    shapes: Shape[],
    setShapes: Dispatch<SetStateAction<Shape[]>>,
    onClose: () => void,
    setSelectedShapeIds: (selectedShapeIds: string[]) => void
}

const ContextMenuShapes = ({ contextMenuState, clipboardRef, shapes, setShapes, onClose, setSelectedShapeIds }: ContextMenuShapesProps) => {
    const { state, functions } = useContextMenuShapes(clipboardRef, shapes, setShapes, setSelectedShapeIds, contextMenuState.shapeId);

    return (
        <DropdownMenu open={contextMenuState.visible} onOpenChange={(open) => !open && onClose()}>
            <DropdownMenuTrigger asChild>
                <div
                    className="fixed"
                    style={{
                        left: contextMenuState.x,
                        top: contextMenuState.y,
                        width: 1,
                        height: 1,
                        opacity: 0,
                    }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuItem>
                    <Edit size={16} />
                    Редактировать
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={functions.cutShape}>
                    <Scissors size={16} />
                    Вырезать
                    <DropdownMenuShortcut>Ctrl+X</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={functions.copyShape}>
                    <ClipboardCopy size={16} />
                    Копировать
                    <DropdownMenuShortcut>Ctrl+C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={!state.canBringForward} onClick={functions.bringToFront}>
                    <BringToFront size={16} />
                    На передний план
                    <DropdownMenuShortcut>Ctrl+]</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={!state.canSendBackward} onClick={functions.sendToBack}>
                    <SendToBack size={16} />
                    На задний план
                    <DropdownMenuShortcut>Ctrl+[</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={!state.canBringForward} onClick={functions.bringForward}>
                    <BringToFront size={16} />
                    Переместить вперед
                    <DropdownMenuShortcut>]</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={!state.canSendBackward} onClick={functions.sendBackward}>
                    <SendToBack size={16} />
                    Переместить назад
                    <DropdownMenuShortcut>[</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={functions.deleteShape}>
                    <Trash2 size={16} color={"red"}/>
                    Удалить
                    <DropdownMenuShortcut>Del</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ContextMenuShapes;