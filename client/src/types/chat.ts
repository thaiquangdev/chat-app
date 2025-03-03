import { UserType } from "./auth";

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: string;
}

export interface ChatStore {
  messages: Message[];
  users: UserType[];
  selectedUser: UserType | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (data: { text: string; image: string }) => Promise<void>;
  setSelectedUser: (selectedUser: UserType | null) => void;
}
