import FormMessageChat from "@/components/chat/form-message-chat";
import FormSearchFriend from "@/components/chat/form-search-friend";
import ListRoomChat from "@/components/chat/list-room-chat"
import MessagesChat from "@/components/chat/messages-chat"
import { Suspense, useRef, useEffect, useState } from "react"

const ChatPage = () => {
  const [roomId, setRoomId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleClickRoomId = (id: string) => {
    setRoomId(id);
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  });

  return (
    <div className="h-[calc(100vh_-_120px)] flex flex-col md:flex-row gap-0 md:gap-px bg-background overflow-hidden">
      {/* Sidebar - Conversations List */}
      <aside className="w-full md:w-80 flex flex-col border-r border-border bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
        </div>

        {/* Search Section */}
        <div className="p-4 border-b border-border">
          <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
            <FormSearchFriend handleClickRoomId={handleClickRoomId}/>
          </Suspense>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading rooms...</div>}>
            <ListRoomChat handleClickRoomId={handleClickRoomId} />
          </Suspense>
        </div>
      </aside>

      {/* Chat Area */}
      <section className="flex-1 flex flex-col bg-background overflow-hidden">
        {
          roomId ? (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto flex flex-col p-4 md:p-6 gap-3">
                <Suspense fallback={<div className="text-center text-muted-foreground">Loading messages...</div>}>
                  <MessagesChat roomId={roomId}/>
                </Suspense>
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-border p-4 md:p-6 bg-card flex-shrink-0">
                <Suspense fallback={<div className="text-sm text-muted-foreground">Loading...</div>}>
                  <FormMessageChat roomId={roomId}/>
                </Suspense>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground mb-2">No conversation selected</p>
                <p className="text-muted-foreground">Select a conversation or start a new one to begin chatting</p>
              </div>
            </div>
        )
        }
      </section>
    </div>
  )
}
export default ChatPage