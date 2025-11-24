import {useForm} from "react-hook-form";
import {createSchema, CreateSchema} from "@/app/(components)/CreateOrConnectProject/CreateForm/constants/CreateSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ROUTES} from "@/utils/constants/routes";

export const useCreateForm = (setIsOpen: (isOpen: boolean) => void, router: AppRouterInstance) => {
    const createForm = useForm<CreateSchema>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: '',
        }
    });

    const onSubmit = createForm.handleSubmit(async (values) => {
        console.log(values)
        setIsOpen(false);
        router.push(ROUTES.EDITORS.$ID(crypto.randomUUID()));
    })

    return {
        form: createForm,
        functions: { onSubmit }
    }
}