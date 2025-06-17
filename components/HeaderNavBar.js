'use client';

import React from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function HeaderNavBar() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between text-[16px] pl-2 pr-4">
      <div className='flex gap-15 items-center'>
        <Image src='/logo-2.png'
          alt='logo'
          width={200}
          height={150}
        />
        {/* <h2>Home</h2> */}
        {/* <h2>Favourite</h2>  */}
      </div>
      <div className="flex bg-gray-100 p-[5px] rounded-md w-[40%] gap-2 md:flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input type="text" placeholder="Search" className=" w-[100%] bg-transparent outline-none" />
      </div>
      <div>
        {session?.user ?
          <Image src={session.user.image}
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />
          : null}
      </div>
    </div>

  )
}

export default HeaderNavBar
