// src/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
import { auth } from "./firebase";

// Signup
export const signup = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async () => {
  return await signOut(auth);
};

// Delete Account
export const deleteAccount = async () => {
  const user = auth.currentUser;
  return await deleteUser(user);
};
