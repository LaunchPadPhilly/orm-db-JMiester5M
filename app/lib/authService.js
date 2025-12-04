'use client';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export async function loginWithEmail(email, password) {
  if (!auth) {
    throw new Error('Firebase authentication is not initialized');
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  if (!auth) {
    throw new Error('Firebase authentication is not initialized');
  }
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}
