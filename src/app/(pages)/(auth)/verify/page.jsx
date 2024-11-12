import Link from 'next/link';
import React from 'react'

export default function page() {
  return (
    <div className="psektion flex items-center justify-center min-h-[65vh] bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-none shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Thanks for Registering to Pamoja
        </h1>
        <p className="text-sm my-5 text-center">Please wait for administration to approve your account</p>
      <div className="flex justify-center">
        <Link
          href="/"
         
          className="w-full text-center cursor-pointer px-5 py-3 bg-pamojaprimary hover:bg-pamojasecondary text-white uppercase  rounded-none focus:outline-none focus:ring-0 hover:shadow-lg"
        >
          Back to Home
        </Link></div>
        <div className="flex justify-center mt-4">
          <Link
            href="/login"
            className="underline text-gray-700 hover:text-pamojaprimary"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
