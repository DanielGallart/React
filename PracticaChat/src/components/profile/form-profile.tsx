import { useProfileActions } from "@/hooks/use-profile-actions";
import { profileZodSchema, type ProfileZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "@/components/ui/button";
import type { User } from "@firebase/auth";
import { toast } from "sonner";

interface Props {
    user: User
}

const FormProfile = ({user}: Props) => {
    const {loading, updateUserProfile} = useProfileActions();
    const form = useForm<ProfileZodSchemaType>({
        resolver: zodResolver(profileZodSchema),
        defaultValues: {
            displayName: user?.displayName || "",
            photoURL: user?.photoURL || ""
        }
    });

    async function onSubmit(values: ProfileZodSchemaType) {
        const result = await updateUserProfile(values);;
        if(result.success) {
            return toast.success("Profile updated successfully");
        }
        toast.error("Error updating profile");
    }

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-full"
            >
                <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-primary font-semibold">
                                <span>👤</span> User Name
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="User Name" {...field} className="bg-background border border-border rounded-md px-3 py-2 focus:border-primary" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="photoURL"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 text-accent font-semibold">
                                <span>🖼️</span> Photo URL
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="Photo URL" {...field} className="bg-background border border-border rounded-md px-3 py-2 focus:border-accent" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading} className="w-full bg-primary text-surface font-semibold py-2 rounded-md hover:bg-accent transition">
                    {loading ? "Updating..." : "Update Profile"}
                </Button>
            </form>
        </Form>
    );
};

export default FormProfile;