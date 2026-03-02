import type { FieldValue, Timestamp } from "firebase/firestore";

export interface Room {
    id: string;
    participants: string[]; // Array of user IDs
    createdAt: Timestamp | FieldValue;
    lastMessage: LastMessage | null;
};

export interface LastMessage {
    text: string;
    senderId: string;
    timestamp: Timestamp | FieldValue;
}

export interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: Timestamp | FieldValue;
}