import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext } from 'react';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  isAuthCompleted: boolean;
  setIsAuthCompleted: (value: React.SetStateAction<boolean>) => void;
  initializing: boolean;
}

export default createContext({} as AuthContextType);
