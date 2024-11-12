import React from 'react';
import { HiOutlineFaceFrown } from 'react-icons/hi2';
import { FaPencilRuler } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { FaChildren } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";

import { Title } from '../texties'

export default function Accomplishment() {
  return (
    <section className='respons bg-[#f8941d] rounded-lg px-5'>    
    <div className="psektion    sektion2 md:grid-cols-4">     
      <div className='bflex flex-col text-center shadow p-1 rounded '>
        <div className='flex justify-center'><FaChildren className='text-6xl shadow-sm text-center'/></div>
        <div><Title first="354+"/></div>
        <div><p className='font-bold'>Students Admission</p></div>
      </div>
      <div className=' flex flex-col text-center shadow p-1 rounded'>
        <div className='flex justify-center'><FaUsers className='text-6xl shadow-sm text-center'/></div>
        <div><Title first="354+"/></div>
        <div><p className='font-bold'>No. of Teachers</p></div>
      </div>
      <div className=' flex flex-col text-center shadow p-1 rounded'>
        <div className='flex justify-center'><MdSchool className='text-6xl shadow-sm text-center'/></div>
        <div><Title first="354+"/></div>
        <div><p className='font-bold'>No. of Classes</p></div>
      </div>
      <div className=' flex flex-col text-center shadow p-1 rounded'>
        <div className='flex justify-center'><FaPencilRuler className='text-6xl shadow-sm text-center'/></div>
        <div><Title first="354+"/></div>
        <div><p className='font-bold'>Years of Experience</p></div>
      </div>
    </div>
    </section>
  )
}
