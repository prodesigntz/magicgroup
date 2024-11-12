"use client";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { createDocument } from "@/firebase/databaseOperations";
import Swal from "sweetalert2";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import firebase from "@/firebase/firebaseInit";
//import { auth } from "@/firebase/firebaseInit"; // Correct Firebase auth import

const SignUpPage = () => {
  const { setAuthUser } = useAppContext(); // Update to correct context function
  const router = useRouter();
  const {auth} = firebase;

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handling sign-up process
  const handleSignUp = async (event) => {
    event.preventDefault();

    // Check password length
    if (formData.password.length < 4) {
      Swal.fire({
        title: "Error!",
        text: "Password should be greater than 4 characters",
        icon: "error",
        confirmButtonColor: "#7b9c40",
      });
      return;
    }

    // Confirm password matching
    if (formData.password !== formData.cPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords don't match.",
        icon: "error",
        confirmButtonColor: "#7b9c40",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create a user with Firebase Auth
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uid = userCredentials.user.uid;
      const userDetails = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        userId: uid,
        role: "user",
        createdAt: new Date(),
        profilePicture: "",
        isVerified: false,
        isEmailVerified: false,
        lastLogin: new Date(),
        department:[]
      };

      // Create user document in Firestore
      const rs = await createDocument(userDetails, "users");
      if (!rs.didSucceed) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while saving your information.",
          icon: "error",
          confirmButtonColor: "#7b9c40",
        });
      } else {
        // Send email verification
        await sendEmailVerification(userCredentials.user);
        // Update app context with user info
        setAuthUser(userDetails);
        // Redirect to verification page
        router.replace("/verify");
      }
    } catch (error) {
      const errorMessage = error.message;
      // Display error message to user
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#7b9c40",
      });
      setError(errorMessage);
    }

    setIsLoading(false);
  };

  return (
    <div className="psektion flex items-center justify-center min-h-[65vh] bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-none shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleSignUp} className="space-y-6 text-start">
          <div>
            <label
              htmlFor="fname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="fname"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  firstName: e.target.value,
                }))
              }
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-none shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="First Name"
            />
          </div>
          <div>
            <label
              htmlFor="lname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  lastName: e.target.value,
                }))
              }
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-none shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Last Name"
            />
          </div>
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
              value={formData.email}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-none shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
            />
          </div>
          <div>
            <label
              htmlFor="cPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cPassword"
              value={formData.cPassword}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  cPassword: e.target.value,
                }))
              }
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-none shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-pamojaprimary hover:bg-pamojasecondary text-white uppercase rounded-none focus:outline-none focus:ring-0 hover:shadow-lg"
          >
            Sign Up
          </button>
          <div className="mt-3 flex items-center gap-2 justify-center">
            <p className="text-gray-700">Already have an account?</p>
            <Link
              href="/login"
              className="hover:text-pamojasecondary text-pamojaprimary"
            >
              Sign In
            </Link>
          </div>
        </form>
        {isLoading && <p>Loading...</p>}
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
