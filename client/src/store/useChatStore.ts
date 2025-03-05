import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "~/lib/axios";
import { UserType } from "~/types/auth";
import { ChatStore, Message } from "~/types/chat";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/user/get-users");
      set({ users: response.data.data.filteredUsers });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      set({ messages: response.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data: { text: string; image: string }) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(`/message/send`, {
        ...data,
        id: selectedUser?._id,
      });
      set({ messages: [...messages, response.data.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subcribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("newMessage", (newMessage: Message) => {
      if (newMessage.senderId !== selectedUser._id) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubcribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },

  setSelectedUser: (selectedUser: UserType | null) => set({ selectedUser }),
}));
