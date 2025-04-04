import React from 'react'
import Register from "@/components/register"
import Image from 'next/image'
const page = () => {
  return (
    <div className='flex justify-between gap-4 max-w-[1440px] mx-auto border-[3px] h-full border-[#205781] shadow-card rounded-2xl mt-10 my-5'>

      <div className='w-[50%] '>
        <Register />
      </div>
      <div className='w-[50%] bg-[#F6F8D5] flex items-center justify-center '>
        <Image 
        src="/Login.png"
        width={600}
        height={100}
        alt="Register"
        className="max-h-[500px] rounded-[50px] p-10" />
      </div>
    </div>
  )
}

export default page