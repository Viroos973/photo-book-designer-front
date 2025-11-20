"use client";

import Link from "next/link";
import {cn} from "@/lib/utils";
import {useHeader} from "@/app/(components)/Header/hooks/useHeader";
import {ROLES} from "@/utils/constants/roles";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {ROUTES} from "@/utils/constants/routes";

export const Header = () => {
    const { state, functions } = useHeader()

    return (
        <div className={`flex items-center w-full h-[80px] border-b p-8 
        ${state.role === ROLES.USER ? "justify-end" : "justify-between"}`}>
            {state.role !== ROLES.USER && (
                <div className={`flex items-center`}>
                    <Button className="cursor-pointer" variant={"ghost"}>
                        <ArrowLeft />
                    </Button>
                    <Button className="cursor-pointer" variant={"ghost"}>
                        {state.projectName || "Новый проект"}
                    </Button>
                </div>
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
                        <Link href={ROUTES.PROFILE}
                              className={cn(
                                  'text-sm font-medium text-muted-foreground hover:underline',
                                  functions.isActive(ROUTES.PROFILE) && 'text-primary'
                              )
                        }>
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