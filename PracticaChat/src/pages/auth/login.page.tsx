import { Button } from "@/components/ui/button";
import { useAuthActions } from "../../hooks/use-auth-actions"

const LoginPage = () => {
  const {loginWithGoogle} = useAuthActions()

  return (
    <div>
      <h1>Login</h1>
      <Button onClick={loginWithGoogle}>Login with Google</Button>
    </div>
  );
}
export default LoginPage