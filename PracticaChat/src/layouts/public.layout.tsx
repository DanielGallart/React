import { Outlet } from "react-router"

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text px-4 py-8">
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto">
        <Outlet/>
      </main>
    </div>
  )
}
export default PublicLayout