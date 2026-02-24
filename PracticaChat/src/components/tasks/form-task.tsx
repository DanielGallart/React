import { taskZodSchema, type TaskZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useTaskActions } from "@/hooks/use-task-actions";
import { toast } from "sonner";

const FormTask = () => {
    const [isPending, startTransition] = useTransition();
    const { createTask } = useTaskActions();

    const form = useForm<TaskZodSchemaType>({
        resolver: zodResolver(taskZodSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    });

    function onSubmit(values: TaskZodSchemaType) {
        startTransition(async () => {
            try {
                await createTask(values);
                form.reset();
                toast.success("Task created successfully!");
            } catch (error) {                
                console.log(error);
                toast.error("Failed to create task. Please try again.");
            }
        });
        console.log(values);
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
                control={form.control}
                name="title"
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="Task title" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="description"
                render = {({field}) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input placeholder="Task description" {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button type="submit" disabled={isPending}>Create Task</Button>
        </form>
    </Form>
}
export default FormTask