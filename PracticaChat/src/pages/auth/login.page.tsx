import { Button } from "@/components/ui/button";
import { useAuthActions } from "../../hooks/use-auth-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

const LoginPage = () => {
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
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Log in to your account using email and password or Google</CardDescription>
      </CardHeader>
      <CardContent>
        ...
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleLoginWithGoogle}
          className="w-full"
        >
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
export default LoginPage