"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';

export default function PendingApprovalPage() {
  const router = useRouter();
  const { authUser } = useAppContext();

  // Redirect to login if no user is authenticated
  React.useEffect(() => {
    if (!authUser) {
      router.replace('/login');
    }
  }, [authUser, router]);

  return (
    <div className="psektion flex items-center justify-center min-h-[65vh] bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-none shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Account Pending Approval
        </h1>
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Your account is currently pending approval from our administrators.
            You&apos;ll be notified via email once your account has been approved.
          </p>
          <p className="text-gray-600">
            Thank you for your patience!
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="text-pamojaprimary hover:text-pamojasecondary underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}