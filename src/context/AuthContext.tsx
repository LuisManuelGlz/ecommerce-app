import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext } from 'react';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
}

export default createContext({} as AuthContextType);
