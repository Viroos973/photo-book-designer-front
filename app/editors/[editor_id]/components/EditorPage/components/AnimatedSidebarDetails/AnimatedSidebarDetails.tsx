'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {ArrowLeft} from 'lucide-react';
import {ScrollArea} from "@/components/ui/scroll-area";
import {useAnimatedSidebarDetails} from "./hooks/useAnimatedSidebarDetails";
import {ComponentProps} from "react";
import {ShapeType} from "@/utils/shapes/shapeTypes";

interface AnimatedSidebarDetailsProps extends ComponentProps<'div'> {
    selectedTools: ShapeType | null,
    setSelectedTools: (selectedTools: ShapeType | null) => void
}

export function AnimatedSidebarDetails({selectedTools, setSelectedTools, children}: AnimatedSidebarDetailsProps) {
    const {state, functions} = useAnimatedSidebarDetails(selectedTools, setSelectedTools)

    return (
        <div className="flex h-full w-full">
            <div className="h-full flex flex-col border-r">
                {state.navigation.map((item) => (
                    <Button
                        key={item.id}
                        variant={state.activeItem === item.id ? "secondary" : "ghost"}
                        className="justify-start !p-3 !h-auto border-b rounded-none"
                        onClick={() => functions.setActiveItem(state.activeItem === item.id ? null : item.id)}
                    >
                        <item.icon className="!h-8 !w-8"/>
                    </Button>
                ))}
            </div>
            <div className={cn(
                "border-r bg-background transition-all duration-300 ease-in-out",
                state.activeItem ? "w-80 opacity-100" : "w-0 opacity-0 overflow-hidden"
            )}>
                {state.activeItem && state.detailContent[state.activeItem as keyof typeof state.detailContent] && (
                    <div className="h-full flex flex-col">
                        <div className="p-4 border-b flex items-center justify-between">
                            <h3 className="font-semibold">
                                {state.detailContent[state.activeItem as keyof typeof state.detailContent].title}
                            </h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => functions.setActiveItem(null)}
                            >
                                <ArrowLeft className='h-4 w-4'/>
                            </Button>
                        </div>
                        <ScrollArea className="flex-1 p-4">
                            {state.detailContent[state.activeItem as keyof typeof state.detailContent].body}
                        </ScrollArea>
                    </div>
                )}
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}