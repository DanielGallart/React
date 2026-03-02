import { useRoomActions } from "@/hooks/use-room-actions"

const ListRoomChat = () => {
    const {rooms} = useRoomActions();
    return (
        <div>
            <pre>{JSON.stringify(rooms, null, 2)}</pre>
        </div>
    )
}
export default ListRoomChat