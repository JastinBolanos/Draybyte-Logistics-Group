export type UserRole = 'director' | 'dispatcher' | 'fleet_manager' | 'customs_broker' | 'analyst' | 'guest';

export interface UserSession {
  email: string;
  name: string;
  company: string;
  role: UserRole;
  isDemo: boolean;
}

export interface AuthState {
  userSession: UserSession;
  isAuthModalOpen: boolean;
  authInitialMode: 'login' | 'register';
}
