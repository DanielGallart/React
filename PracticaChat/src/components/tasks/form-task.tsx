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
                toast.error("Failed to create task. Please try again. " + error);
            }
        });
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <FormField 
                control={form.control}
                name="title"
                render = {({field}) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2 text-primary font-semibold">
                            <span>📝</span> Title
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Task title" {...field} className="bg-background border border-border rounded-md px-3 py-2 focus:border-primary"/>
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
                        <FormLabel className="flex items-center gap-2 text-accent font-semibold">
                            <span>✏️</span> Description
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Task description" {...field} className="bg-background border border-border rounded-md px-3 py-2 focus:border-accent"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button type="submit" disabled={isPending} className="w-full bg-primary text-surface font-semibold py-2 rounded-md hover:bg-accent transition">Create Task</Button>
        </form>
    </Form>
}
export default FormTask