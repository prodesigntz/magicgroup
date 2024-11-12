import React from 'react'
import { FaStar } from 'react-icons/fa6'

export const StarRating = () => {
  return (
 <div className="flex items-center space-x-2 text-pamojaprimary">
    <FaStar className='text-sm'/>
    <FaStar className='text-sm'/>
    <FaStar className='text-sm'/>
    <FaStar className='text-sm'/>
    <FaStar className='text-sm'/>
  </div>
  )
}
