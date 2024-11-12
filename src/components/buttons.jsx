"use client"

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link';

/// data here

export const ButtonOne = ({ name, className, onClick }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Button
        onClick={onClick}
        className="rounded-none text-center text-lg px-5 py-1.5  bg-pamojaprimary hover:bg-pamojadark gilda_display"
      >
        {name}
      </Button>
    </div>
  );
};
export const ButtonLink = ({ name, href, className, onClick }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Button
        onClick={onClick}
        className="rounded-none text-center text-lg px-5 py-1.5  bg-pamojaprimary hover:bg-pamojadark gilda_display"
      >
        <Link href={href}> {name}</Link>
      </Button>
    </div>
  );
};

