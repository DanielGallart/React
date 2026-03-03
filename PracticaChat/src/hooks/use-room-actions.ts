import type { Room } from "@/schemas/room.schema";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";

export const useRoomActions = () => {
    const db = useFirestore();
    const { data: user } = useUser();

    const roomRef = collection(db, "rooms");

    const roomQuery = query(roomRef, where("participants", "array-contains", user?.uid || ""));

    const {data: rooms} = useFirestoreCollectionData(roomQuery, {suspense: true, idField: "id"});

    const searchUserwithEmail = async (email: string) => {
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("email", "==", email));
        const querySnapshot = await getDocs(userQuery);

        if(querySnapshot.empty) {
            return null;
        }
        
        const userDoc = querySnapshot.docs[0];
        return userDoc.data();
    }

    const findOrCreateRoom = async(friendEmail: string) => {
        if(!user) return {
            success: false,
            message: "Error 401. User not authenticated",
            roomId: null
        }

        if(user.email === friendEmail) {
            return {
                success: false,
                message: "Error 400. You cannot create a room with yourself",
                roomId: null
            }
        }

        const friend = await searchUserwithEmail(friendEmail);

        if(!friend) {
            return {
                success: false,
                message: "Error 404. User not found",
                roomId: null
            }
        }

        const existsRoom = rooms.find(room => (
            room.participants.includes(friend.uid)
        ));

        if(existsRoom) {
            return {
                success: true,
                message: "200. Room already exists",
                roomId: existsRoom.id
            }
        }

        const newRoom: Omit<Room, "id"> = {
            createdAt: serverTimestamp(),
            lastMessage: null,
            participants: [user.uid, friend.uid]
        }

        const document = await addDoc(roomRef, newRoom);

        return {
            success: true,
            message: "201. Room created successfully",
            roomId: document.id
        }
    }

    return {
        rooms: rooms as Room[],
        findOrCreateRoom
    }
}