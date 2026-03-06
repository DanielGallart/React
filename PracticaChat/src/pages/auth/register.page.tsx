import CardFooterAuth from "@/components/card-footer-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, KeyRound } from "lucide-react";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { registerZodSchema, type RegisterZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterPage = () => {
  const { register, loading } = useAuthActions();

  const form = useForm<RegisterZodSchemaType>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterZodSchemaType) => {
    const response = await register(values);
    if (response.error) {
      if (response.error.code === "auth/email-already-in-use") {
        form.setError("email", {
          type: "manual",
          message: "Email is already in use.",
        });
      } else {
        toast.error("Registration failed. Please try again. " + response.error.message);
      }
    } else {
      toast.success("Registration successful");
    }
  };

  return (
    <Card className="bg-surface shadow-lg rounded-lg max-w-md mx-auto w-full">
      <CardHeader className="flex flex-col items-center gap-2">
        <div className="bg-primary p-3 rounded-full mb-2">
          <User className="text-surface w-6 h-6" />
        </div>
        <CardTitle className="text-primary text-2xl font-bold">Register</CardTitle>
        <CardDescription className="text-muted-foreground font-medium">Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-text font-semibold">
                    <User className="w-4 h-4 text-primary" /> Display Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your display name"
                      className="bg-background border border-border rounded-md px-3 py-2 focus:border-primary text-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-text font-semibold">
                    <Mail className="w-4 h-4 text-primary" /> Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className="bg-background border border-border rounded-md px-3 py-2 focus:border-primary text-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-text font-semibold">
                    <Lock className="w-4 h-4 text-primary" /> Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter your password"
                      className="bg-background border border-border rounded-md px-3 py-2 focus:border-primary text-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-text font-semibold">
                    <KeyRound className="w-4 h-4 text-primary" /> Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Confirm your password"
                      className="bg-background border border-border rounded-md px-3 py-2 focus:border-primary text-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary text-surface font-semibold py-2 rounded-md hover:bg-secondary transition"
              disabled={loading}
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth
        type="register"
        loading={loading}
      />
    </Card>
  );
};
export default RegisterPage;