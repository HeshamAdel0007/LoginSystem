' use client '

import userAuth from "@/hooks/auth/checkauth";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const Admin = () => {
  const router = useRouter();
  const token = localStorage.getItem('Token');
  const auth = userAuth({ userToken: token }); // check user login or no

  // check user if is not login will redirect to login page
  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        router.push('/login/admin');
      }, 3000)
    }

  }, [])

  if (!auth) {
    return <div className='flex gap-2 mt-2 w-full h-screen justify-center items-center'>
      Sorry you cant access this page, try again later...
    </div>
  }

  return (
    <div className="flex gap-2 mt-2 w-full h-screen justify-center items-center">
      <h1>Publisher</h1>
    </div>
  )
}

export default Publisher;