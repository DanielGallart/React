import FormTask from "@/components/tasks/form-task"
import ListTask from "@/components/tasks/list-task"
import { Suspense } from "react"

const TasksPage = () => {
  return (
    <div className="container mx-auto max-w-2xl mt-8 bg-surface rounded-xl shadow-lg p-6 flex flex-col items-stretch gap-6">
      <span className="text-warning text-4xl">📝</span>
      <h1 className="text-3xl font-bold text-text">Tasks</h1>
      <FormTask/>
      <Suspense fallback={<div className="text-text">Loading tasks...</div>}>
        <ListTask/>
      </Suspense>
    </div>
  )
}
export default TasksPage