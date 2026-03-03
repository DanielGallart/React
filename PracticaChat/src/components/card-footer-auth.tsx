import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuthActions } from "@/hooks/use-auth-actions"
import { toast } from "sonner"
import { Link } from "react-router";

interface Props {
  type: "login" | "register";
  loading: boolean;
}

const CardFooterAuth = ({type, loading}: Props) => {
    const {loginWithGoogle} = useAuthActions()

    const isLogin = type === "login";

    const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if(result.success) {
      toast.success("Login successfully");
    } else {
        toast.error(`Login failed: ${result.error?.message || "Unknown error"}`)
    }
  }
  return (
    <CardFooter className="flex flex-col items-center gap-4">
        <Button
          onClick={handleLoginWithGoogle}
          className="w-full"
          disabled={loading}
        >
          {isLogin ? "Login with Google" : "Register with Google"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Link to={isLogin ? "/auth/register" : "/auth/login"} className="ml-1 text-blue-500 hover:underline">
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
            >
              {isLogin ? "Register" : "Sign in"}
            </Button>
          </Link>
        </p>
      </CardFooter>
  )
}
export default CardFooterAuth