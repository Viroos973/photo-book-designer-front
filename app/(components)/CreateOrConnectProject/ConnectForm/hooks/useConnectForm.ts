import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {connectSchema, ConnectSchema} from "@/app/(components)/CreateOrConnectProject/ConnectForm/constants/ConnectSchema";

export const useConnectForm = (setIsOpen: (isOpen: boolean) => void) => {
    const connectForm = useForm<ConnectSchema>({
        resolver: zodResolver(connectSchema),
        defaultValues: {
            inviteCode: '',
        }
    });

    const onSubmit = connectForm.handleSubmit(async (values) => {
        console.log(values)
        setIsOpen(false);
    })

    return {
        form: connectForm,
        functions: { onSubmit }
    }
}