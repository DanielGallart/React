import FormMessageChat from "@/components/chat/form-message-chat";
import FormSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat"
import MessagesChat from "@/components/chat/messages-chat"
import { Suspense, useState } from "react"

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section className="space-y-4">
        <Suspense fallback="Loading rooms...">
          <FormSearchFriend handleClickRoomId={handleClickRoomId}/>
          <ListRoomChat handleClickRoomId={handleClickRoomId} />
        </Suspense>
      </section>
      <section>
        {
          roomId ? (
            <Suspense fallback="Loading messages...">
              <FormMessageChat roomId={roomId}/>
              <MessagesChat roomId={roomId}/>
            </Suspense>
          ) : (
            <div className="p-4">Select a room to view messages</div>
        )
        }
      </section>
    </div>
  )
}
export default ChatPage