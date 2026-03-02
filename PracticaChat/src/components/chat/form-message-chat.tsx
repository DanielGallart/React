import { messageZodSchema, type MessageZodSchemaType } from "@/lib/zod.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { useMessagesActions } from "@/hooks/use-messages-actions"
import { toast } from "sonner"
import { useTransition } from "react"

interface Props {
    roomId: string;
}

const FormMessageChat = ({roomId}: Props) => {
    const [isLoading, startTransition] = useTransition();

    const {sendMessage} = useMessagesActions(roomId);

    const form = useForm<MessageZodSchemaType>({
        resolver: zodResolver(messageZodSchema),
        defaultValues: {
            text: "",
        }
    })

    async function onSubmit(values: MessageZodSchemaType) {
        startTransition(async () => {
            try {
                await sendMessage(values.text);
                form.reset();
            } catch (error) {
                console.error("Error sending message:", error);
                toast.error("Error sending message");
            }
        })
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
                control={form.control}
                name="text"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                            <Input placeholder="Type your message here..." {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button type="submit" disabled={isLoading}>
                {
                    isLoading ? "Sending message" : "Send message"
                }
            </Button>
        </form>
    </Form>
}
export default FormMessageChat