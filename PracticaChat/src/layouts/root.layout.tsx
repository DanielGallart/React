import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <main className="flex-1 flex flex-col container mx-auto px-4 sm:px-6">
        <Outlet/>
      </main>
      <Toaster position="top-center" richColors />
    </div>
  )
}
export default RootLayout