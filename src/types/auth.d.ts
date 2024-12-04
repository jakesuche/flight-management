 interface User {
  id: string;
  email: string;
  name: string;
}

 interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}




 interface LoginCredentials {
  email: string;
  password: string;
}

 interface RegisterCredentials extends LoginCredentials {
  name: string;
}


interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

 interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<User>;
}

 type AuthHook = AuthState & AuthActions;