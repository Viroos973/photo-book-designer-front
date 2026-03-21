import {useRegisterForm} from "./hooks/useRegisterForm";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface RegisterFormProps {
    setIsOpen: (isOpen: boolean) => void,
    setIsRegister: (isRegister: boolean) => void
}

export const RegisterForm = ({ setIsOpen, setIsRegister } : RegisterFormProps) => {
    const { form, functions } = useRegisterForm(setIsOpen)

    return (
        <Form {...form}>
            <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input placeholder="Имя пользователя..." {...field} />
                            </FormControl>
                            <FormMessage>
                                {form.formState?.errors?.name && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input placeholder="Email..." {...field} />
                            </FormControl>
                            <FormMessage>
                                {form.formState?.errors?.email && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input placeholder="Пароль..." {...field} type="password" />
                            </FormControl>
                            <FormMessage>
                                {form.formState?.errors?.password && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.password.message}
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button type="button" variant="outline" className='h-10 w-full' onClick={() => setIsRegister(false)}>
                    {"Войти"}
                </Button>
                <Button type='submit' className='h-10 w-full'>
                    {"Зарегестрироваться"}
                </Button>
            </form>
        </Form>
    )
}