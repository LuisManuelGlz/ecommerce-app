import React, {
  createContext,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
  useContext,
} from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { NativeModules } from 'react-native';
import { IUserForSignIn } from '../interfaces/IUserForSignIn';
import { IUserForSignUpAccount } from '../interfaces/IUserForSignUpAccount';
import { IUserForSignUpPersonalDetails } from '../interfaces/IUserForSignUpPersonalDetails';
import { AlertContext } from './AlertContext';

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  setUser: Dispatch<SetStateAction<FirebaseAuthTypes.User | null>>;
  isAuthCompleted: boolean;
  setIsAuthCompleted: Dispatch<SetStateAction<boolean>>;
  signIn: (userForSignIn: IUserForSignIn) => void;
  signUpAccount: (userForSignUpAccount: IUserForSignUpAccount) => void;
  signUpPersonalDetails: (
    userForSignUpPersonalDetails: IUserForSignUpPersonalDetails,
  ) => void;
  googleSignIn: () => void;
  facebookSignIn: () => void;
  twitterSignIn: () => void;
  signOut: () => void;
};

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);
const { RNTwitterSignIn } = NativeModules;

const AuthProvider = ({ children }: Props) => {
  const { alert } = useContext(AlertContext);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isAuthCompleted, setIsAuthCompleted] = useState(false);

  const signIn = async ({ email, password }: IUserForSignIn) => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        alert('error', 'Oops!', 'El correo no es válido');
      } else if (error.code === 'auth/user-disabled') {
        alert('error', 'Oops!', 'El usuario ha sido deshabilitado');
      } else if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        alert('error', 'Oops!', 'El correo o la contraseña son incorrectos');
      }

      console.error(error);
    }
  };

  const signUpAccount = async ({ email, password }: IUserForSignUpAccount) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('error', 'Oops!', 'El correo ya está en uso');
      } else if (error.code === 'auth/invalid-email') {
        alert('error', 'Oops!', 'El correo no es válido');
      } else if (error.code === 'auth/weak-password') {
        alert(
          'error',
          'Oops!',
          'Tu contraseña es muy débil, elige una más fuerte',
        );
      }
      console.error(error);
    }
  };

  const signUpPersonalDetails = async ({
    fullName,
    address,
    cardNumber,
  }: IUserForSignUpPersonalDetails) => {
    const { currentUser } = auth();

    try {
      await currentUser?.updateProfile({
        displayName: currentUser?.displayName || fullName,
        photoURL:
          currentUser?.photoURL ||
          'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      });

      await firestore().collection('users').doc(user?.uid).set({
        fullName,
        address,
        cardNumber,
      });

      setIsAuthCompleted(true);

      alert(
        'success',
        'Registro exitoso',
        'Tu cuenta ha sido creada correctamente',
      );
    } catch (error) {
      console.log(error);
      alert('error', 'Oops!', 'Algo salió mal');
    }
  };

  const googleSignIn = async () => {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
      alert('error', 'Oops!', 'Algo salió mal');
    }
  };

  const facebookSignIn = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      await auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log(error);
      alert('error', 'Oops!', 'Algo salió mal');
    }
  };

  const twitterSignIn = async () => {
    try {
      // Perform the login request
      const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

      // Create a Twitter credential with the tokens
      const twitterCredential = auth.TwitterAuthProvider.credential(
        authToken,
        authTokenSecret,
      );

      // Sign-in the user with the credential
      await auth().signInWithCredential(twitterCredential);
    } catch (error) {
      console.log(error);
      alert('error', 'Oops!', 'Algo salió mal');
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
      alert('error', 'Oops!', 'Algo salió mal');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthCompleted,
        setIsAuthCompleted,
        signIn,
        signUpAccount,
        signUpPersonalDetails,
        googleSignIn,
        facebookSignIn,
        twitterSignIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
