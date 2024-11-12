import Image from 'next/image'
import React from 'react'

export const GalleryImage = ({activity,locate,alt, src}) => {
  return (
    <div className="relative">
        <Image
        src={src}
        alt={alt}
        className=""
        width={1000}
        height={240}
        style={{
            maxWidth: "100%",
            height: "380px",
            objectFit: "cover",
            }}
        />
        <div className="absolute inset-0 bg-black space-y-5 bg-opacity-30 flex flex-col justify-center items-center text-white text-center ">
          <h2 className="text-2xl babylonica ">{locate}</h2>
          <h3 className="text-2xl gilda_display font-bold">{activity}</h3>
        </div>
    </div>
  )
}
