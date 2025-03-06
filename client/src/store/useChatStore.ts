import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "~/lib/axios";
import { UserType } from "~/types/auth";
import { ChatStore, Message } from "~/types/chat";
import { useAuthStore } from "./useAuthStore";
import { GroupType } from "~/types/group";

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  selectedGroup: null,
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

  getMessagesGroup: async (groupId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`message/${groupId}`);
      set({ messages: response.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessageGroup: async (data: { text: string; image: string }) => {
    const { selectedGroup, messages } = get();
    try {
      const response = await axiosInstance.post(`/message/send-group`, {
        ...data,
        id: selectedGroup?._id,
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

  subcribeToGroupMessages: () => {
    const { selectedGroup } = get();
    if (!selectedGroup) return;

    const socket = useAuthStore.getState().socket;
    socket?.on("newMessageGroup", (newMessage: Message) => {
      if (newMessage.groupId !== selectedGroup._id) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubcribeFromGroupMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessageGroup");
  },

  setSelectedUser: (selectedUser: UserType | null) => set({ selectedUser }),

  setSelectedGroup: (selectedGroup: GroupType | null) => set({ selectedGroup }),
}));
