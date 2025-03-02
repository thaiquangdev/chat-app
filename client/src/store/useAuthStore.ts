import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "~/lib/axios";
import {
  AuthState,
  UserSignin,
  UserSignup,
  UserUpdateProfile,
} from "~/types/auth";

// Tạo Zustand store với TypeScript
export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.data });
    } catch (error) {
      console.error("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: UserSignup) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/register", data);
      toast.success("Tạo tài khoản thành công");
      set({ authUser: response.data.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  signin: async (data: UserSignin) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data.data });
      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Đăng xuất thành công");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data: UserUpdateProfile) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/user/update-profie", data);
      set({ authUser: response.data.data });
      toast.success("Upload ảnh thành công");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
