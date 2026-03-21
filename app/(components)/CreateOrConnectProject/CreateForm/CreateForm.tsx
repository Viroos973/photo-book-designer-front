import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useCreateForm} from "@/app/(components)/CreateOrConnectProject/CreateForm/hooks/useCreateForm";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface CreateFormProps {
    setIsOpen: (isOpen: boolean) => void;
    router: AppRouterInstance
}

export const CreateForm = ({setIsOpen, router}: CreateFormProps) => {
    const { state, form, functions } = useCreateForm(setIsOpen, router);

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
                <FormField
                    control={form.control}
                    name="pagesNum"
                    render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input placeholder="Количество страниц..." {...field} type="number"/>
                            </FormControl>
                            <FormMessage>
                                {form.formState?.errors?.pagesNum && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.pagesNum.message}
                                    </p>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-2">
                    <Select onValueChange={functions.handleDimensionsChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выберите размер страниц" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Квадратный</SelectLabel>
                                <SelectItem value="20×20">20×20см</SelectItem>
                                <SelectItem value="25×25">25×25см</SelectItem>
                                <SelectItem value="30×30">30×30см</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Ландшафтный</SelectLabel>
                                <SelectItem value="25×20">25×20см</SelectItem>
                                <SelectItem value="33×28">33×28см</SelectItem>
                                <SelectItem value="38×30">38×30см</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Портретный</SelectLabel>
                                <SelectItem value="20×25">20×25см</SelectItem>
                                <SelectItem value="28×35">28×35см</SelectItem>
                                <SelectItem value="30×38">30×38см</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Другое</SelectLabel>
                                <SelectItem value="Custom">Кастомный</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {form.formState?.errors?.heightTemplate && !state.isCustomDimensions ? (
                        <p className="text-red-600 text-sm mt-1">
                            {form.formState.errors.heightTemplate.message}
                        </p>
                    ) : form.formState?.errors?.widthTemplate && !state.isCustomDimensions && (
                        <p className="text-red-600 text-sm mt-1">
                            {form.formState.errors.widthTemplate.message}
                        </p>
                    )}
                </div>
                <div className={`flex items-start gap-2 ${!state.isCustomDimensions ? "hidden" : ""}`}>
                    <FormField
                        control={form.control}
                        name="widthTemplate"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Ширина страниц..." {...field} type="number"/>
                                </FormControl>
                                <FormMessage>
                                    {form.formState?.errors?.widthTemplate && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {form.formState.errors.widthTemplate.message}
                                        </p>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                    <p className="font-bold mt-2">×</p>
                    <FormField
                        control={form.control}
                        name="heightTemplate"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Высота страниц..." {...field} type="number"/>
                                </FormControl>
                                <FormMessage>
                                    {form.formState?.errors?.heightTemplate && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {form.formState.errors.heightTemplate.message}
                                        </p>
                                    )}
                                </FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type='submit' className='h-10 w-full'>
                    {"Создать"}
                </Button>
            </form>
        </Form>
    )
}