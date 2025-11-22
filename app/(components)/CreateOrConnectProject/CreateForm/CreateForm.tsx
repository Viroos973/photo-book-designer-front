import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useCreateForm} from "@/app/(components)/CreateOrConnectProject/CreateForm/hooks/useCreateForm";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

interface CreateFormProps {
    setIsOpen: (isOpen: boolean) => void;
    router: AppRouterInstance
}

export const CreateForm = ({setIsOpen, router}: CreateFormProps) => {
    const { form, functions } = useCreateForm(setIsOpen, router);

    return (
        <Form {...form}>
            <form onSubmit={functions.onSubmit} className='w-full space-y-4'>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input placeholder="Имя проекта..." {...field} />
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
                <Button type='submit' className='h-10 w-full'>
                    {"Создать"}
                </Button>
            </form>
        </Form>
    )
}