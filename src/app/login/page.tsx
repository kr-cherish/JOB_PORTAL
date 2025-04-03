import React from 'react'
import Login from "@/components/login"
import Image from 'next/image'
const page = () => {
  return (
    <div className='flex justify-between gap-4 max-w-[1440px] mx-auto border-black-200 border-[3px] shadow-accent rounded-2xl px-30 my-50'>

    <div className='w-[50%]  flex items-center justify-end  m-auto'>
      <Login />
    </div>
    <div className='w-[50%] flex items-center justify-center '>
      <Image 
      src="/Login.png"
      width={400}
      height={100}
      alt="Register"
      className="max-h-[500px]" />
    </div>
  </div>

  )
}

export default page