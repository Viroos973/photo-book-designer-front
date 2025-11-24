"use client";

import Link from "next/link";
import {useHeader} from "@/app/(components)/Header/hooks/useHeader";
import {ROLES} from "@/utils/constants/roles";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {ROUTES} from "@/utils/constants/routes";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {PROJECT_TYPES} from "@/utils/constants/projectTypes";

export const Header = () => {
    const { state, functions } = useHeader()

    return (
        <div className={`flex items-center w-full h-[80px] border-b p-8 
        ${state.role === ROLES.USER ? "justify-end" : "justify-between"}`}>
            {state.role !== ROLES.USER && (
                <>
                    <div className={`flex items-center`}>
                        <Link href={ROUTES.ROOT}>
                            <Button className="cursor-pointer" variant={"ghost"}>
                                <ArrowLeft/>
                            </Button>
                        </Link>
                        <Button className="cursor-pointer" variant={"ghost"}>
                            {state.projectName || "Новый проект"}
                        </Button>
                    </div>
                    <Tabs defaultValue={state.initialProjectType} onValueChange={(e) => functions.setProjectType(e)}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value={PROJECT_TYPES.EDITOR} className="cursor-pointer">
                                Редактор
                            </TabsTrigger>
                            <TabsTrigger value={PROJECT_TYPES.MOVING_PAGES} className="cursor-pointer">
                                Страницы
                            </TabsTrigger>
                            <TabsTrigger value={PROJECT_TYPES.RESULT} className="cursor-pointer">
                                Результат
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </>
            )}
            <div className={`flex items-center gap-2`}>
                {state.role !== ROLES.USER && (
                    <>
                        <Button className="cursor-pointer" variant={"outline"}>
                            {"Сохранить"}
                        </Button>
                        <Button className="cursor-pointer" variant={"outline"}>
                            {"Скачать"}
                        </Button>
                    </>
                )}
                {state.authenticated ? (
                    <>
                        <Link href={ROUTES.PROFILE.ROOT}>
                            <Button className="cursor-pointer" variant={"default"}>
                                {"Профиль"}
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Button className="cursor-pointer" variant={"default"}>
                        {"Войти"}
                    </Button>
                )}
            </div>
        </div>
    )
}