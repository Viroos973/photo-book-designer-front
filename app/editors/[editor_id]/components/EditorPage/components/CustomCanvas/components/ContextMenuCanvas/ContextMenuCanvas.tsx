import {ContextMenuProps, Shape} from "@/utils/shapes/shapeTypes";
import {Dispatch, RefObject, SetStateAction} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ClipboardCopy, Scan, Trash2} from "lucide-react";
import {
    useContextMenuCanvas
} from "@/app/editors/[editor_id]/components/EditorPage/components/CustomCanvas/components/ContextMenuCanvas/hooks/useContextMenuCanvas";

interface ContextMenuCanvasProps {
    contextMenuState: ContextMenuProps;
    clipboardRef: RefObject<Shape | null>;
    setShapes: Dispatch<SetStateAction<Shape[]>>
    onClose: () => void
}

const ContextMenuCanvas = ({contextMenuState, clipboardRef, setShapes, onClose}: ContextMenuCanvasProps) => {
    const { functions } = useContextMenuCanvas(contextMenuState, clipboardRef, setShapes)

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
                <DropdownMenuItem onClick={functions.pasteShape}>
                    <Scan size={16} />
                    Вставить
                    <DropdownMenuShortcut>Ctrl+V</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={functions.selectAll}>
                    <ClipboardCopy size={16} />
                    Выбрать все
                    <DropdownMenuShortcut>Ctrl+C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={functions.deleteAll}>
                    <Trash2 size={16} color={"red"}/>
                    Очистить все
                    <DropdownMenuShortcut>Del</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ContextMenuCanvas;