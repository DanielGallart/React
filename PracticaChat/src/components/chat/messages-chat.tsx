import { useMessagesActions } from "@/hooks/use-messages-actions"
import MessageChat from "./message-chat";

interface Props {
    roomId: string;
}

const MessagesChat = ({ roomId }: Props) => {
    const { messages } = useMessagesActions(roomId)

    return (
        <>
            {
                messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map(message => (
                        <MessageChat 
                            key={message.id}
                            message={message}
                        />
                    ))
                )
            }
        </>
    )
}
export default MessagesChat