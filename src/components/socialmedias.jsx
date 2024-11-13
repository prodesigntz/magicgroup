import Link from 'next/link'
import React from 'react'
import { FaFacebookSquare, FaTripadvisor } from 'react-icons/fa'
import { FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6'
import { RiInstagramFill } from 'react-icons/ri'

export default function Socialmedias() {
  return (
    <div>
       <div className="flex items-center space-x-2">
              <Link href="/">
                <FaLinkedin className="text-xl" />
              </Link>
              <Link href="/">
                <RiInstagramFill className="text-xl" />
              </Link>
              <Link href="/">
                <FaFacebookSquare className="text-xl" />
              </Link>
              <Link href="/">
                <FaSquareXTwitter className="text-xl" />
              </Link>
              {/* <Link href="/">
                <FaTripadvisor className="text-xl" />
              </Link> */}
             
            </div>
    </div>
  )
}
