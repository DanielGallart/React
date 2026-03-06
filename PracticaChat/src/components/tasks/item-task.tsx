import { useTaskActions } from "@/hooks/use-task-actions";
import type { Task } from "@/schemas/task.schema";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
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
                toast.error("Failed to delete task. Please try again. " + error);
            }
        });
    }

    const handleToggleCompleted = async () => {
        startTransition(async () => {
            try {
                await toggleTaskCompleted(task.id);
            } catch (error) {
                toast.error("Failed to update task. Please try again. " + error);
            }
        });
    }

    return (
        <Card className="bg-background border border-border shadow-md w-full">
            <CardHeader>
                <div className="w-full flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <CardTitle className={cn("text-lg font-semibold flex items-center gap-2 wrap-break-word",
                        task.completed ? "line-through text-muted-foreground" : "text-primary"
                    )}>
                        <span>{task.completed ? "✅" : "📝"}</span> {task.title}
                    </CardTitle>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                        <Button variant={"outline"} onClick={handleToggleCompleted} disabled={isPending} size="sm" className="whitespace-normal">
                            {task.completed ? "Mark as Pending" : "Mark as Done"}
                        </Button>
                        <Button variant={"destructive"} onClick={handleDelete} disabled={isPending} size="sm" className="whitespace-normal">
                            🗑️ Delete
                        </Button>
                    </div>
                </div>
            </CardHeader>

            {
                task.description && (
                    <CardContent className="text-muted-foreground mt-0 px-6 pt-2 wrap-break-word">
                        {task.description}
                    </CardContent>
                )
            }
        </Card>
    )
}
export default ItemTask