import { useRoomActions } from "@/hooks/use-room-actions"
import RoomChat from "./room-chat";

interface Props {
    handleClickRoomId: (id: string) => void;
}

const ListRoomChat = ({handleClickRoomId}: Props) => {
    const {rooms} = useRoomActions();
    return (
        <div className="flex flex-col divide-y divide-border">
            {
                rooms.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No conversations yet. Search for a friend to start chatting!
                    </div>
                ) : (
                    rooms.map(room => (
                        <RoomChat 
                            key={room.id}
                            room={room}
                            handleClickRoomId={handleClickRoomId}
                        />
                    ))
                )
            }
        </div>
    )
}
export default ListRoomChat