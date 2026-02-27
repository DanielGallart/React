import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { 
    collection,
    query, 
    where,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";
import type { Task } from "@/schemas/task.schema";

export const useTaskActions = () => {
    const { data: user } = useUser();

    if (!user) {
        throw new Error("User must be authenticated to use task actions");
    }

    const db = useFirestore();
    
    const taskCollectionRef = collection(db, "tasks");
    const taskQuery = query(taskCollectionRef, where("userId", "==", user!.uid));

    const { status, data: tasks } = useFirestoreCollectionData(taskQuery, 
        { 
            idField: "id",
            suspense: true
        }
    );

    //CREATE
    const createTask = async (data: {
        title: string;
        description?: string;
    }) => {
        const newTask = {
            ...data,
            completed: false,
            userId: user!.uid,
        }
        
        return await addDoc(taskCollectionRef, newTask);
    };

    //DELETE
    const deleteTask = async (taskId: string) => {
        const taskDoc = doc(db, "tasks", taskId);
        return await deleteDoc(taskDoc);
    }

    //Toggle completed
    const toggleTaskCompleted = async (taskId: string) => {
        const task = tasks.find((task) => task.id === taskId);
        if (!task) {
            throw new Error("Task not found");
        }
        const taskDoc = doc(db, "tasks", taskId);
        return await updateDoc(taskDoc, { completed: !task.completed });
    }

    return {
        tasks: tasks as Task[],
        isLoading: status === "loading",

        createTask,
        deleteTask,
        toggleTaskCompleted
    }
}