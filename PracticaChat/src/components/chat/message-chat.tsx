import type { Message } from "@/schemas/room.schema";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface Props {
    message: Message;
}

const MessageChat = ({ message }: Props) => {
    const {data: user} = useUser();
    const isFriend = user?.uid !== message.senderId;

    return (
        <div className={cn(
            "flex gap-2 items-end max-w-md",
            isFriend ? "justify-start" : "justify-end ml-auto"
        )}>
            {isFriend && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    ?
                </div>
            )}
            
            <div className={cn(
                "rounded-2xl px-4 py-2 break-words shadow-sm",
                isFriend 
                    ? "bg-muted text-foreground rounded-bl-none" 
                    : "bg-blue-500 text-white rounded-br-none"
            )}>
                <p className="text-sm font-medium">{message.text}</p>
                <p className={cn(
                    "text-xs mt-1 opacity-70",
                    isFriend ? "text-muted-foreground" : "text-blue-100"
                )}>
                    {
                        isFriend ? (
                            <Suspense fallback="...">
                                <FriendEmail friendUID={message.senderId}/>
                            </Suspense>
                        ) : "You"
                    }
                </p>
            </div>

            {!isFriend && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    Y
                </div>
            )}
        </div>
    )
}
export default MessageChat