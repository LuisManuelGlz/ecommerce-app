import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext } from 'react';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  setIsAuthCompleted: (value: React.SetStateAction<boolean>) => void;
}

export default createContext({} as AuthContextType);
