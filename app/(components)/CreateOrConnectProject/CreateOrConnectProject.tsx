import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {CreateForm} from "@/app/(components)/CreateOrConnectProject/CreateForm/CreateForm";
import {ConnectForm} from "@/app/(components)/CreateOrConnectProject/ConnectForm/ConnectForm";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

interface CreateOrConnectProjectProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    isCreate?: boolean,
    router: AppRouterInstance
}

export const CreateOrConnectProject = ({isOpen, setIsOpen, router, isCreate = false}: CreateOrConnectProjectProps) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{isCreate ? "Создать" : "Присоединиться"}</DialogTitle>
            </DialogHeader>
            {isCreate ? (
                <CreateForm setIsOpen={setIsOpen} router={router} />
            ) : (
                <ConnectForm setIsOpen={setIsOpen} />
            )}
        </DialogContent>
    </Dialog>
)