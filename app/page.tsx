"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";
import {useHome} from "@/app/(hooks)/useHome";
import {CreateOrConnectProject} from "@/app/(components)/CreateOrConnectProject/CreateOrConnectProject";

export default function Home() {
  const {state, functions} = useHome()

  return (
    <div className='mx-auto mt-4 flex max-w-[1200px] flex-col gap-10'>
      <div className="mx-12">
        <div className='flex items-center justify-between mx-12'>
          <p className='text-2xl font-bold'>{"Мои проекты"}</p>
          <div className='flex items-center gap-2'>
            <Input
                leftIcon={<SearchIcon className='h-5 w-5'/>}
                placeholder="Поиск..."
                className='h-10 sm:max-w-64 w-full'
            />
            <Button className="cursor-pointer h-10" onClick={functions.handleOpenConnect}>
              {"Присоединиться к проекту"}
            </Button>
            <Button className="cursor-pointer h-10" onClick={functions.handleOpenCreate}>
              {"Создать проект"}
            </Button>
            <CreateOrConnectProject isOpen={state.isOpen} setIsOpen={functions.setIsOpen} isCreate={state.isCreate}
                                    router={state.router}/>
          </div>
        </div>

      </div>
    </div>
  );
}
