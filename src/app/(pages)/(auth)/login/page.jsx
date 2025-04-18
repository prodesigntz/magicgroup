"use client";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signInWithPopup,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import firebase from "@/firebase/firebaseInit";
import { createDocument, getSingleDocument } from "@/firebase/databaseOperations";
import Backdrop from "@/components/simpleComponents/backdrop";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const { auth, db } = firebase;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    // Choose persistence based on the "Remember Me" checkbox
    await setPersistence(
      auth,
      rememberMe
        ? firebase.auth.Auth.Persistence.LOCAL
        : browserSessionPersistence
    );
    const rs = await signInWithEmailAndPassword(auth, email, password);
    const user = rs.user;

    // Check if user is verified
    const userDoc = await getSingleDocument("users", user.uid);
    if (!userDoc.didSucceed) {
      throw new Error("Failed to fetch user data");
    }

    // Set verification status in cookie
    document.cookie = `isVerified=${userDoc.document.isVerified}; path=/`;

    if (!userDoc.document.isVerified) {
      router.replace("/pending");
      return;
    }

    router.replace("/dashboard");
  } catch (error) {
    const errorMessage =
      error.code === "auth/invalid-credential"
        ? "Wrong email or password"
        : error.message;
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error",
      confirmButtonColor: "#7b9c40",
    });
    console.error("Login failed", error);
  }
  setIsLoading(false);
};


  // Google Sign-In function
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if email is already registered
      const emailQuery = query(collection(db, "users"), where("email", "==", user.email));
      const emailSnapshot = await getDocs(emailQuery);
      
      if (emailSnapshot.empty) {
        // Create new user document in Firestore
        const userDetails = {
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          userId: user.uid,
          role: "user",
          createdAt: new Date(),
          profilePicture: user.photoURL || "",
          isVerified: false,
          isEmailVerified: user.emailVerified,
          lastLogin: new Date(),
          department: [],
          authProvider: "google"
        };

        const rs = await createDocument(userDetails, "users");
        if (!rs.didSucceed) {
          throw new Error("Failed to save user information");
        }
        document.cookie = `isVerified=false; path=/`;
        router.replace("/pending");
        return;
      }

      // User exists, get their document
      const existingUserDoc = emailSnapshot.docs[0].data();
      document.cookie = `isVerified=${existingUserDoc.isVerified}; path=/`;
      
      if (!existingUserDoc.isVerified) {
        router.replace("/pending");
        return;
      }
      
      router.replace("/dashboard");



    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#7b9c40",
      });
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <>
      {isLoading && <Backdrop onClose={() => setIsLoading(false)} />}

      <div className="psektion flex items-center justify-center min-h-[65vh] bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-none shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-none shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-none shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-start text-sm">
              <Link
                href="/password-recovery"
                className="text-gray-700 hover:text-green-600"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pamojaprimary hover:bg-pamojasecondary cursor-pointer"
              } text-white uppercase rounded-none focus:outline-none`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {!isLoading && (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full cursor-pointer py-3 uppercase rounded-none focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-slate-500 shadow-md hover:shadow-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <FcGoogle className="text-2xl" />
                  <p className="text-gray-700">Sign in with Google</p>
                </div>
              </button>
            )}

            <div className="flex items-center gap-2 justify-center">
              <p className="text-gray-700">Need an account?</p>
              <Link
                href="/register"
                className="hover:text-green-800 text-pamojaprimary hover:text-pamojasecondary"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
