export interface User {
  id: string;
  fullName: string;
  email: string;
  profilePic?: string;
}

export interface UserSignup {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthState {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: UserSignup) => Promise<void>;
  logout: () => Promise<void>;
}
