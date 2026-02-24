import { useTaskActions } from "@/hooks/use-task-actions";

const ListTask = () => {
    const { tasks } = useTaskActions();
    
    
    return (
        <div>
            <pre>{JSON.stringify(tasks, null, 2)}</pre>
        </div>
    )
}
export default ListTask