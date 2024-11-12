"use client"

import TawkMessengerReactUmd from '@tawk.to/tawk-messenger-react';
import React from 'react'

export default function TawtoMessenger() {
const liveChat = process.env.NEXT_PUBLIC_TAWKTO_PROPERTYID;
const widgetId = process.env.NEXT_PUBLIC_TAWKTO_WIDGETID;



  return (
    <div className="">
      <TawkMessengerReactUmd propertyId={liveChat} widgetId={widgetId} />
    </div>
  );
}
