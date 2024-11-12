"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import firebase from "@/firebase/firebaseInit";
import Swal from "sweetalert2";
import Link from "next/link";

const PasswordRecovery = () => {
  const { auth } = firebase;
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        title: "Success!",
        text: "Password reset link has been sent to your email.",
        icon: "success",
        confirmButtonColor: "#7b9c40",
      });
      setEmail("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#7b9c40",
      });
      console.error("Error sending password reset email:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="psektion flex items-center justify-center min-h-[65vh] bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-none shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Password Recovery
        </h1>
        <form onSubmit={handlePasswordReset} className="space-y-6">
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
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-none shadow-sm focus:ring-none focus:border-none"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer py-3 bg-pamojaprimary hover:bg-pamojasecondary text-white uppercase  rounded-none focus:outline-none focus:ring-0 hover:shadow-lg"
          >
            {isLoading ? "Sending..." : "Send Password Reset Link"}
          </button>
        </form>
        <div className="flex justify-end mt-4">
          <Link
            href="/login"
            className="underline text-gray-700 hover:text-blue-600"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
