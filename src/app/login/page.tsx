import React from 'react'
import Login from "@/components/login"
import Image from 'next/image'
const page = () => {
  return (
    <div className='flex justify-between gap-4 max-w-[1440px] mx-auto border-[#205781] border-[2px] shadow-accent rounded-2xl px-10 my-50'>

    <div className='lg:w-[50%] w-full flex items-center justify-end m-auto'>
      <Login />
    </div>
    <div className='lg:w-[50%] bg-[#F6F8D5] w-full hidden lg:flex items-center justify-center '>
      <Image 
      src="/Login.png"
      width={400}
      height={100}
      alt="Register"
      className="max-h-[500px] p-10 rounded-[60px]" />
    </div>
  </div>

  )
}

export default page