export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  succeeded: boolean;
  token: string;
  expiration: string;
  userId: string;
  fullName: string;
  email: string;
  roles: string[];
  errors?: string[];
}
