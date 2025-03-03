export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  createdAt: string;
}

export interface UserSignup {
  fullName: string;
  email: string;
  password: string;
}

export interface UserSignin {
  email: string;
  password: string;
}

export interface UserUpdateProfile {
  profilePic: string;
}

export interface AuthState {
  authUser: UserType | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: UserType[];

  checkAuth: () => Promise<void>;
  signup: (data: UserSignup) => Promise<void>;
  signin: (data: UserSignin) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UserUpdateProfile) => Promise<void>;
}
