import { useState, useCallback } from 'react';
import { UserSession } from '../domain/auth';
import { APP_CONFIG } from '../utils/constants';

const INITIAL_DIRECTOR_SESSION: UserSession = {
  email: APP_CONFIG.DEFAULT_DIRECTOR_EMAIL,
  name: 'Director General',
  company: APP_CONFIG.APP_NAME,
  role: 'director',
  isDemo: true
};

const GUEST_DEMO_SESSION: UserSession = {
  email: APP_CONFIG.DEFAULT_DEMO_EMAIL,
  name: 'Visitante Demo',
  company: 'Flujo Satelital Abierto',
  role: 'guest',
  isDemo: true
};

export function useAuthSession() {
  const [userSession, setUserSession] = useState<UserSession>(INITIAL_DIRECTOR_SESSION);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');

  const handleOpenAuth = useCallback((mode: 'login' | 'register' = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const handleCloseAuth = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const handleLoginSuccess = useCallback((session: UserSession) => {
    setUserSession(session);
    setIsAuthModalOpen(false);
  }, []);

  const handleEnterDemoMode = useCallback(() => {
    setUserSession(GUEST_DEMO_SESSION);
    setIsAuthModalOpen(false);
  }, []);

  const handleSignOut = useCallback(() => {
    setUserSession(GUEST_DEMO_SESSION);
  }, []);

  return {
    userSession,
    setUserSession,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authInitialMode,
    handleOpenAuth,
    handleCloseAuth,
    handleLoginSuccess,
    handleEnterDemoMode,
    handleSignOut
  };
}
