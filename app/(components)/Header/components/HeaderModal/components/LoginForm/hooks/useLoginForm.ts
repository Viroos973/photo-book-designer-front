import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, LoginSchema} from "../constants/LoginSchema";
import {usePostLoginMutation} from "@/shared/api/hooks";
import {useAuth} from "@/shared/contexts";
import {toast} from "sonner";

export const useLoginForm = (setIsOpen: (isOpen: boolean) => void) => {
    const login = usePostLoginMutation()
    const { login: handleLogin } = useAuth()

    const loginForm = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = loginForm.handleSubmit(async (values) => {
        try {
            const token = await login.mutateAsync({
                params: {
                    email: values.email,
                    password: values.password
                }
            });

            handleLogin(token.data.accessToken, token.data.refreshToken)
            loginForm.reset();
            setIsOpen(false);
        } catch {
            toast.error(`Неверные данные`);
        }
    })

    return {
        form: loginForm,
        functions: { onSubmit }
    }
}