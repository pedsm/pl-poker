import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UserContextType {
  rememberMe: boolean;
  name: string;
  setRememberMe: (value: boolean) => void;
  setName: (value: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [rememberMe, setRememberMeState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('rememberMe');
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  });

  const [name, setNameState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('name') || '';
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
    if(rememberMe === false) {
      console.log('Removing name from local storage')
      toast.info('All data has been forgotten')
    }
  }, [rememberMe]);

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  const setRememberMe = (value: boolean) => {
    setRememberMeState(value);
  };

  const setName = (value: string) => {
    setNameState(value);
  };

  return (
    <UserContext.Provider value={{ rememberMe, name, setRememberMe, setName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 