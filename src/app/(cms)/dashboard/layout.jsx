'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { doc, getDoc } from 'firebase/firestore';
import firebase from '@/firebase/firebaseInit';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { authUser, isFetchingAuthUser } = useAppContext();
  const [isVerified, setIsVerified] = useState(null);
  const [isCheckingVerification, setIsCheckingVerification] = useState(true);

  useEffect(() => {
    const checkUserVerification = async () => {
      if (!authUser && !isFetchingAuthUser) {
        router.replace('/login');
        return;
      }

      if (authUser) {
        try {
          const userDoc = await getDoc(doc(firebase.db, 'users', authUser.uid));
          const userData = userDoc.data();
          setIsVerified(userData?.isVerified);
        } catch (error) {
          console.error('Error checking user verification:', error);
        }
      }
      setIsCheckingVerification(false);
    };

    checkUserVerification();
  }, [authUser, router, isFetchingAuthUser]);

  if (isFetchingAuthUser || isCheckingVerification) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!authUser) {
    return null;
  }

  // If user is not verified and trying to access dashboard pages
  if (isVerified === false && router.pathname !== '/dashboard/pending') {
    router.replace('/dashboard/pending');
    return null;
  }

  return children;
}