import { UserType } from "./auth";
import { GroupType } from "./group";

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  groupId: string;
  text: string;
  image: string;
  createdAt: string;
}

export interface ChatStore {
  messages: Message[];
  users: UserType[];
  selectedUser: UserType | null;
  selectedGroup: GroupType | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (data: { text: string; image: string }) => Promise<void>;
  getMessagesGroup: (groupId: string) => Promise<void>;
  sendMessageGroup: (data: { text: string; image: string }) => Promise<void>;
  subcribeToMessages: () => void;
  unsubcribeToMessages: () => void;
  subcribeToGroupMessages: () => void;
  unsubcribeFromGroupMessages: () => void;
  setSelectedUser: (selectedUser: UserType | null) => void;
  setSelectedGroup: (selectedGroup: GroupType | null) => void;
}
