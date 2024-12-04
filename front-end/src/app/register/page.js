'use client'
import RegisterSelection from "@/components/auth/RegisterSelection";
import userAuth from "@/hooks/auth/checkauth"
import Link from "next/link";

const RegisterAs = () => {
  const token = localStorage.getItem('Token');
  const auth  = userAuth({userToken: token})// check user login or no
  
  if (auth) {
    return<div className='flex gap-2 mt-2 w-full h-screen justify-center items-center'>
      Sorry you cant access this page, try again later...
      <Link
          href="/"
          className="text-sm font-semibold ml-2 text-white hover:text-yellow cursor-pointer hover:-translate-y-1 duration-500 transition-all">
          ClickHere
        </Link>
      </div> 
  }
  return (
     <div>
      <RegisterSelection/>
    </div>
  )
}

export default RegisterAs;