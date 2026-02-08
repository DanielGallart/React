import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuthActions } from "@/hooks/use-auth-actions"
import { toast } from "sonner"

const CardFooterAuth = () => {
    const {loginWithGoogle} = useAuthActions()

    const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if(result.success) {
      console.log("Login successfully");
    } else {
        console.error("Login failed:", result.error);
        toast.error(`Login failed: ${result.error?.message || "Unknown error"}`)
    }
  }
  return (
    <CardFooter>
        <Button
          onClick={handleLoginWithGoogle}
          className="w-full"
        >
          Login with Google
        </Button>
      </CardFooter>
  )
}
export default CardFooterAuth