import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { storeUserData, getUserData, clearAllStorage } from '../utils/storage';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // User is signed in
        const userData = {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName || 'User'
        };
        
        // Store user data locally
        await storeUserData(userData);
        
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // User is signed out
        setUser(null);
        setIsAuthenticated(false);
        await clearAllStorage();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, displayName) => {
    try {
      setLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
      // Update the user's display name
      await userCredential.user.updateProfile({
        displayName: displayName
      });

      // Create user document in Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        uid: userCredential.user.uid,
        email: email,
        displayName: displayName,
        createdAt: firestore.FieldValue.serverTimestamp(),
        bookings: [],
        reviews: []
      });

      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      await auth().sendPasswordResetEmail(email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (displayName) => {
    try {
      setLoading(true);
      const currentUser = auth().currentUser;
      
      if (currentUser) {
        // Update Firebase Auth profile
        await currentUser.updateProfile({ displayName });
        
        // Update Firestore document
        await firestore().collection('users').doc(currentUser.uid).update({
          displayName: displayName,
          updatedAt: firestore.FieldValue.serverTimestamp()
        });
        
        // Update local user state
        const updatedUser = { ...user, displayName };
        setUser(updatedUser);
        await storeUserData(updatedUser);
        
        return { success: true };
      }
      return { success: false, error: 'No user found' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
