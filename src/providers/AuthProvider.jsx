import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import Swal from "sweetalert2";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const showToast = (icon, title) => {
    Swal.fire({
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      toast: true,
    });
  };

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });

  const googleSignIn = () => signInWithPopup(auth, googleProvider);

  const updateUserProfile = (userInfo) =>
    updateProfile(auth.currentUser, userInfo);

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();

          const res = await axios.get(
            `https://a12-blood-bridge-server.vercel.app/users/${currentUser.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "",
            photoURL: currentUser.photoURL || "",
            role: res.data?.role || "donor",
            status: res.data?.status || "active",
            accessToken: token, // ✅ Store token in user context
          });
        } catch (err) {
          console.error("Failed to fetch role/status:", err.message);
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "",
            photoURL: currentUser.photoURL || "",
            role: "donor",
            status: "active",
            accessToken: await currentUser.getIdToken(), // ✅ Store token in user context
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    updateUserProfile,
    logOut,
    showToast,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
