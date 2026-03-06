import { emailFriendZodSchema, type EmailFriendZodSchemaType } from "@/lib/zod.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useRoomActions } from "@/hooks/use-room-actions";
import { toast } from "sonner";
import { Search } from "lucide-react";

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                    <FormItem className="flex-1">
                        <FormControl>
                            <Input 
                                type="email" 
                                placeholder="Search by email..." 
                                className="rounded-full px-4 py-2 text-sm"
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}    
            />
            <Button 
                type="submit" 
                variant="ghost"
                size="icon"
                className="rounded-full flex-shrink-0"
                disabled={isLoading}
            >
                <Search className="w-5 h-5" />
            </Button>
        </form>
    </Form>
}
export default FormSearchFriend