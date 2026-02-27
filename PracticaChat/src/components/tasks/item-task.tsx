import { useTaskActions } from "@/hooks/use-task-actions";
import type { Task } from "@/schemas/task.schema";
import { Card, CardTitle, CardHeader, CardAction, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
    task: Task;
}

const ItemTask = ({ task }: Props) => {
    const { deleteTask, toggleTaskCompleted } = useTaskActions();
    const [isPending, startTransition] = useTransition();
    
    const handleDelete = async () => {
        startTransition(async () => {
            try {
                await deleteTask(task.id);
            } catch (error) {
                console.log(error);
                toast.error("Failed to delete task. Please try again.");
            }
        });
    }

    const handleToggleCompleted = async () => {
        startTransition(async () => {
            try {
                await toggleTaskCompleted(task.id);
            } catch (error) {
                console.log(error);
                toast.error("Failed to update task. Please try again.");
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className={cn("text-lg font-semibold",
                    task.completed ? "line-through text-gray-500" : ""
                )}>{task.title}</CardTitle>
                <CardAction className="space-x-2">
                    <Button variant={"outline"} onClick={handleToggleCompleted} disabled={isPending}>Update</Button>
                    <Button variant={"destructive"} onClick={handleDelete} disabled={isPending}>Delete</Button>
                </CardAction>
                {
                    task.description && (
                        <CardContent>
                            {task.description}
                        </CardContent>
                    )
                }
            </CardHeader>
        </Card>
    )
}
export default ItemTask