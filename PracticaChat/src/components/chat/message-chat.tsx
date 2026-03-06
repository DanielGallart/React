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
            "flex gap-2 items-end max-w-lg",
            isFriend ? "justify-start" : "justify-end ml-auto"
        )}>
            {isFriend && (
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    <span>👤</span>
                </div>
            )}
            <div className={cn(
                "rounded-2xl px-4 py-2 wrap-break-word shadow-md",
                isFriend 
                    ? "bg-muted text-text rounded-bl-none" 
                    : "bg-primary text-surface rounded-br-none"
            )}>
                <p className="text-base font-medium">{message.text}</p>
                <p className={cn(
                    "text-xs mt-1 opacity-70",
                    isFriend ? "text-muted-foreground" : "text-surface"
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
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-accent to-primary flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    <span>🧑</span>
                </div>
            )}
        </div>
    )
}
export default MessageChat