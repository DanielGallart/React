import ListRoomChat from "@/components/chat/list-room-chat"
import { Suspense } from "react"

const ChatPage = () => {
  return (
    <div className="grid grid-cols-1">
      <section>
        <Suspense fallback={<div>Loading rooms...</div>}>
          <ListRoomChat />
        </Suspense>
      </section>
      <section>

      </section>
    </div>
  )
}
export default ChatPage