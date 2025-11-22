import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useConnectForm} from "@/app/(components)/CreateOrConnectProject/ConnectForm/hooks/useConnectForm";

interface CreateFormProps {
    setIsOpen: (isOpen: boolean) => void;
}

export const ConnectForm = ({setIsOpen}: CreateFormProps) => {
    const { form, functions } = useConnectForm(setIsOpen);

    return (
        <Form {...form}>
            <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                <FormField
                    control={form.control}
                    name="login_key"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input placeholder="Ключ входа..." {...field} />
                            </FormControl>
                            <FormMessage>
                                {form.formState?.errors?.login_key && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.login_key.message}
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button type='submit' className='h-10 w-full'>
                    {"Присоедениться"}
                </Button>
            </form>
        </Form>
    )
}