import { useAuthActions } from "@/hooks/use-auth-actions";
import { useUser } from "reactfire"
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { data: user } = useUser();
  const { logout } = useAuthActions();

  return (
    <div className="container mx-auto max-w-xl mt-10 bg-surface rounded-xl shadow-lg p-8 flex flex-col items-center gap-6">
      <span className="text-primary text-4xl">🏠</span>
      <h1 className="text-3xl font-bold text-text">Dashboard</h1>
      <p className="text-lg text-text">Welcome, <span className="font-semibold text-accent">{user?.displayName || "Guest"}</span>!</p>
      <p className="text-base text-text">Email: <span className="font-semibold">{user?.email || "No email available"}</span></p>
      <Button 
        onClick={logout}
        variant="destructive"
        size="lg"
        className="mt-4"
      >
        Sign Out
      </Button>
    </div>
  )
}
export default DashboardPage