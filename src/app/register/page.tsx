import React from 'react'
import Register from "@/components/register"
import Image from 'next/image'
const page = () => {
  return (
    <div className='flex justify-between gap-4 max-w-[1440px] mx-auto border-[6px] border-black-200 shadow-card rounded-2xl '>

      <div className='w-[50%] '>
        <Register />
      </div>
      <div className='w-[50%] flex items-center justify-center '>
        <Image 
        src="/Login.png"
        width={600}
        height={100}
        alt="Register"
        className="max-h-[500px]" />
      </div>
    </div>
  )
}

export default page