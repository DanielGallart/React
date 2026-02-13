import { useAuthActions } from "@/hooks/use-auth-actions";
import { useUser } from "reactfire"
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
  const { data: user } = useUser();
  const { logout } = useAuthActions();

  return (
    <div className="container mx-auto">
      <h1>Dashboard Page</h1>
      <p>Welcome, {user?.displayName || "Guest"}!</p>
      <p>Email: {user?.email || "No email available"}</p>
      <Button 
        onClick={logout}
        variant={"destructive"}
      >
        Sign Out
      </Button>
    </div>
  )
}
export default DashboardPage