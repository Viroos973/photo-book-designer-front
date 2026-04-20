import {useMovingPage} from "@/app/editors/[editor_id]/components/MovingPage/hooks/useMovingPage";
import {closestCenter, DndContext, DragOverlay} from "@dnd-kit/core";
import {rectSwappingStrategy, SortableContext} from "@dnd-kit/sortable";
import {SpreadPage} from "@/app/editors/[editor_id]/components/MovingPage/components/SpreadPage/SpreadPage";
import MiniPage from "@/app/editors/[editor_id]/components/MiniPage/MiniPage";

export const MovingPage = () => {
    const {state, functions} = useMovingPage()

    return (
        <div className="mx-auto my-4 max-w-[1700px] flex flex-col gap-8">
            <p className='text-2xl font-bold text-center'>{"Страницы"}</p>
            <DndContext
                sensors={state.sensors}
                collisionDetection={closestCenter}
                onDragStart={functions.handleDragStart}
                onDragEnd={functions.handleDragEnd}
            >
                <SortableContext items={state.pages.map(p => p.id)} strategy={rectSwappingStrategy}>
                    <div className="flex items-center gap-8 flex-wrap px-8 justify-center">
                        {state.pages[0] && (
                            <div className="flex items-center justify-center" style={{width: state.pages[0].width * 2}}>
                                <div style={{width: state.pages[0].width}}/>
                                <SpreadPage id={state.pages[0].id}
                                            shapes={state.pages[0].shapes}
                                            scale={state.pages[0].scale}
                                            width={state.pages[0].width}
                                            height={state.pages[0].height}
                                            pageNumber={state.pages[0].pageNumber}
                                            isDraggable={false}/>
                            </div>
                        )}
                        {state.spreads.map((page) => (
                            <div key={page.leftPage.id} className="flex items-center justify-center" style={{width: state.pages[0].width * 2}}>
                                <SpreadPage id={page.leftPage.id} shapes={page.leftPage.shapes}
                                            scale={page.leftPage.scale} width={page.leftPage.width}
                                            height={page.leftPage.height} pageNumber={page.leftPage.pageNumber}
                                            isDraggable={page.leftPage.pageNumber !== -1}/>
                                <SpreadPage id={page.rightPage.id} shapes={page.rightPage.shapes}
                                            scale={page.rightPage.scale} width={page.rightPage.width}
                                            height={page.rightPage.height} pageNumber={page.rightPage.pageNumber}
                                            isDraggable={page.rightPage.pageNumber !== -1}/>
                            </div>
                        ))}
                        {state.pages[state.lastPageNum] && (
                            <div className="flex items-center justify-center" style={{width: state.pages[0].width * 2}}>
                                <SpreadPage id={state.pages[state.lastPageNum].id}
                                            shapes={state.pages[state.lastPageNum].shapes}
                                            scale={state.pages[state.lastPageNum].scale}
                                            width={state.pages[state.lastPageNum].width}
                                            height={state.pages[state.lastPageNum].height}
                                            pageNumber={state.pages[state.lastPageNum].pageNumber}
                                            isDraggable={false} isLast={true}/>
                                <div style={{ width: state.pages[0].width }}/>
                            </div>
                        )}
                    </div>
                </SortableContext>
                <DragOverlay>
                    {state.activeId && state.activePage ? (
                        <div className="shadow-lg rotate-1">
                            <MiniPage shapes={state.activePage.shapes} pageNumber={state.activePage.pageNumber}
                                      width={state.activePage.width} height={state.activePage.height}
                                      scale={state.activePage.scale} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}