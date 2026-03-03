import { emailFriendZodSchema, type EmailFriendZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useRoomActions } from "@/hooks/use-room-actions";
import { toast } from "sonner";

interface Props {
    handleClickRoomId: (id: string) => void;
}

const FormSearchFriend = ({ handleClickRoomId }: Props) => {
    const [isLoading, startTransition] = useTransition();
    const {findOrCreateRoom} = useRoomActions();

    const form = useForm<EmailFriendZodSchemaType>({
        resolver: zodResolver(emailFriendZodSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(values: EmailFriendZodSchemaType) {
        startTransition(async() => {
            const response = await findOrCreateRoom(values.email);

            if(response.success) {
                handleClickRoomId(response.roomId);
                toast.success("Friend found and room is ready!");
                form.reset();
                return;
            }
            toast.error(response.message);
        });
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email of your friend</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="friend@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}    
            />
            <Button 
                type="submit" 
                variant={"outline"} 
                className="w-full"
                disabled={isLoading}
            >
                {isLoading ? "Searching..." : "Search Friend"}
            </Button>
        </form>
    </Form>
}
export default FormSearchFriend