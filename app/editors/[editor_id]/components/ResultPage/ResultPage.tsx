import {useResultPage} from "@/app/editors/[editor_id]/components/ResultPage/hooks/useResultPage";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {CustomCanvas} from "@/app/editors/[editor_id]/components/EditorPage/components/CustomCanvas/CustomCanvas";

export const ResultPage = () => {
    const { state, functions } = useResultPage();

    return (
        <div className="mx-auto my-4 max-w-[1700px] flex items-center justify-center gap-12">
            <Button variant="ghost" onClick={() => functions.handleChangeSpread(state.spreadNumber - 1)}>
                <ArrowLeft className="!w-[40] !h-[40]" />
            </Button>
            <CustomCanvas width={state.width * 2} height={state.height} selectedTools={null} isReadOnly={true}
                          shapes={state.shapes} setShapes={functions.setShapes} setSelectedTools={()=>{}} isOriginalSize={true}/>
            <Button variant="ghost" onClick={() => functions.handleChangeSpread(state.spreadNumber + 1)}>
                <ArrowRight className="!w-[40] !h-[40]" />
            </Button>
        </div>
    )
}