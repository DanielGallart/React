import type { Room } from "@/schemas/room.schema";
import { useUser } from "reactfire";
import FriendEmail from "./friend-email";
import { Suspense } from "react";

interface Props {
  room: Room;
  handleClickRoomId: (id: string) => void;
}

const RoomChat = ({ room, handleClickRoomId }: Props) => {
  const {data: user} = useUser();
  const friendUid = room.participants.find((id) => id !== user?.uid) || "";
  
  return (
    <button 
      onClick={() => handleClickRoomId(room.id)}
      className="w-full text-left px-4 py-3 hover:bg-accent transition-colors duration-200 flex items-center gap-3 group"
    >
      {/* Avatar Placeholder */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
        <Suspense fallback="?">
          <div className="text-sm">
            <FriendEmail friendUID={friendUid} />
          </div>
        </Suspense>
      </div>
      
      {/* Conversation Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground truncate group-hover:text-blue-600 transition-colors">
          <Suspense fallback="Loading...">
            <FriendEmail friendUID={friendUid} />
          </Suspense>
        </h3>
        <p className="text-sm text-muted-foreground truncate">Tap to open</p>
      </div>

      {/* Unread Indicator */}
      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
    </button>
  )
}
export default RoomChat