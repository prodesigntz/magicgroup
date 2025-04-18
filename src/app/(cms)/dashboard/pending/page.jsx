'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { signOut } from 'firebase/auth';
import firebase from '@/firebase/firebaseInit';

export default function PendingApprovalPage() {
  const router = useRouter();
  const { auth } = firebase;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Account Pending Approval
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your account is currently pending approval from an administrator.
            You'll be notified via email once your account has been approved.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={handleSignOut}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}