import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, LoginSchema} from "../constants/LoginSchema";

export const useLoginForm = (setIsOpen: (isOpen: boolean) => void) => {
    const loginForm = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = loginForm.handleSubmit(async (values) => {
        console.log(values)
        setIsOpen(false);
    })

    return {
        form: loginForm,
        functions: { onSubmit }
    }
}