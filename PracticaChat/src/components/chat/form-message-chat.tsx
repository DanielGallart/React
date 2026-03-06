import { messageZodSchema, type MessageZodSchemaType } from "@/lib/zod.schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { useMessagesActions } from "@/hooks/use-messages-actions"
import { toast } from "sonner"
import { useTransition } from "react"
import { Send } from "lucide-react"

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-center">
            <FormField
                control={form.control}
                name="text"
                render={({field}) => (
                    <FormItem className="flex-1">
                        <FormControl>
                            <Input 
                                placeholder="Type a message..." 
                                className="rounded-full px-4 py-3 text-base border border-border bg-background focus:border-primary"
                                {...field} 
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button 
                type="submit" 
                disabled={isLoading || !(form.watch("text") || "").trim()}
                className="rounded-full aspect-square p-0 w-12 h-12 flex items-center justify-center shrink-0 bg-primary text-surface hover:bg-accent transition"
            >
                <Send className="w-5 h-5" />
            </Button>
        </form>
    </Form>
}
export default FormMessageChat