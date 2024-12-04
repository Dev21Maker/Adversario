import { auth } from './firebase';
import { 
  signInAnonymously, 
  signInWithPopup, 
  GoogleAuthProvider,
  User
} from 'firebase/auth';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

export const signInAsGuest = async () => {
  try {
    const result = await signInAnonymously(auth);
    return result;
  } catch (error) {
    console.error('Guest sign in error:', error);
    throw error;
  }
};

export const getDisplayName = (user: User) => {
  if (!user) return 'Guest';
  return user.displayName || `Guest ${user.uid.slice(0, 4)}`;
};