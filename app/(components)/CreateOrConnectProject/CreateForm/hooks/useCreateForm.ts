import {useForm} from "react-hook-form";
import {createSchema, CreateSchema} from "@/app/(components)/CreateOrConnectProject/CreateForm/constants/CreateSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ROUTES} from "@/utils/constants/routes";
import {useState} from "react";
import {cmToPx} from "@/utils/helpers/cmAndPx";
import {toast} from "sonner";
import {usePostCreateRoomMutation} from "@/shared/api/hooks/usePostCreateRoomMutation";

export const useCreateForm = (setIsOpen: (isOpen: boolean) => void, router: AppRouterInstance) => {
    const createRoom = usePostCreateRoomMutation()

    const [isCustomDimensions, setIsCustomDimensions] = useState(false);
    const createForm = useForm<CreateSchema>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: '',
            pagesNum: '60',
            widthTemplate: '',
            heightTemplate: ''
        }
    });

    const handleDimensionsChange = (value: string) => {
        if (value === "Custom") {
            setIsCustomDimensions(true);
        } else {
            setIsCustomDimensions(false);
            const [width, height] = value.split("×");

            createForm.setValue("widthTemplate", width)
            createForm.setValue("heightTemplate", height)
        }
    }

    const onSubmit = createForm.handleSubmit(async (values) => {
        try {
            const body = {
                name: values.name,
                pagesNum: Number(values.pagesNum),
                widthTemplate: cmToPx(Number(values.widthTemplate)),
                heightTemplate: cmToPx(Number(values.heightTemplate)),
            }

            const room = await createRoom.mutateAsync({
                params: {
                    name: body.name,
                    pagesNum: body.pagesNum,
                    widthTemplate: body.widthTemplate,
                    heightTemplate: body.heightTemplate
                }
            })

            createForm.reset()
            setIsOpen(false)
            router.push(ROUTES.EDITORS.$ID(room.data.id));
        } catch {
            toast.error(`Что-то пошло не так`);
        }
    })

    return {
        state: { isCustomDimensions },
        form: createForm,
        functions: { onSubmit, handleDimensionsChange }
    }
}