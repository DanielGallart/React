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
        className="w-full bg-accent text-surface font-semibold py-2 rounded-md hover:bg-primary transition"
        disabled={loading}
      >
        <span className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.805 10.023h-9.765v3.977h5.588c-.241 1.238-1.03 2.287-2.199 2.963v2.463h3.555c2.084-1.922 3.291-4.757 3.291-8.403 0-.553-.049-1.089-.125-1.523z" fill="#4285F4"/><path d="M12.04 21c2.7 0 4.963-.89 6.617-2.413l-3.555-2.463c-.988.664-2.25 1.057-3.062 1.057-2.353 0-4.348-1.591-5.065-3.73h-3.6v2.523c1.646 3.257 5.19 5.026 8.665 5.026z" fill="#34A853"/><path d="M6.04 13.451c-.225-.664-.353-1.37-.353-2.451 0-.682.127-1.387.353-2.051v-2.523h-3.6c-.729 1.457-1.145 3.09-1.145 4.574 0 1.484.416 3.117 1.145 4.574l3.6-2.123z" fill="#FBBC05"/><path d="M12.04 7.509c1.47 0 2.78.506 3.813 1.492l2.855-2.855c-1.654-1.523-3.917-2.413-6.617-2.413-3.475 0-7.019 1.769-8.665 5.026l3.6 2.523c.717-2.139 2.712-3.77 5.065-3.77z" fill="#EA4335"/></svg>
          {isLogin ? "Login with Google" : "Register with Google"}
        </span>
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <Link to={isLogin ? "/auth/register" : "/auth/login"} className="ml-1 text-primary hover:underline">
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