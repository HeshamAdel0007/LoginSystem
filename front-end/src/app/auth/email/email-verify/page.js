'use client'
import FormLayout from "@/components/auth/FormLayout";
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import Button from "@/components/Button";
import Form from 'next/form';
import axios from "@/lib/axios";
import { useEffect, useState } from 'react';
import Link from "next/link";
import userAuth from "@/hooks/auth/checkauth";

const EmailVerify = () => {
  const [isErrors, setErrors] = useState('');
  const [isSendLink, setSendLink] = useState('');
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('Token');
  const verified = localStorage.getItem('email_verified_at');
  const [isVerified, setVerified] = useState(false);
  const auth = userAuth({ userToken: token })
  
  useEffect(() => {
    if (verified != 'null' && verified != null) {
      setVerified(true)
    }
  }, [verified])
  
  // check if user is login & email verify or no
  if (isVerified || !auth) {
    return <div className='flex gap-2 mt-2 w-full h-screen justify-center items-center'>
      Sorry you cant access this page, try again later...
      <Link
          href="/"
          className="text-sm font-semibold ml-2 text-white hover:text-yellow cursor-pointer hover:-translate-y-1 duration-500 transition-all">
          ClickHere
        </Link>
    </div>
  }

  // send link verify to mail
  const sendEmailVerification = async e => {
    e.preventDefault()
    // get token from localStorage
    const token = localStorage.getItem('Token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    axios.get('/email/verification', config)
      .then((response) => {
        setSendLink(response.data.message)
      })
      .catch(error => {
        if (error) {
          setErrors('please try again later')
          
          }

      })

  }

  return (
    <FormLayout>
      <Form onSubmit={sendEmailVerification} className="bg-white rounded-md shadow-2xl p-5">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">
          Send Email Verification
          
        </h1>
        <span className="mb-5 text-red-500 text-sm font-semibold">
          { isErrors }
        </span>

        { isSendLink ?
            <span className="mb-5 text-green-500 text-sm font-semibold">
              { isSendLink }
            </span>
            :
            <span className="mb-5 text-black text-sm font-semibold">
              <br/>Please click the button below to send link verification...
            </span>
        }
        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
          <AtSymbolIcon className="h-5 w-5 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            className="pl-2 w-full outline-none border-none text-black"
            placeholder={email}
            disabled
          />
        </div>
        <Button
          ButtonName={'Send Link'}
          ButtonType={'submit'}
          ButtonClass={'block w-full bg-black mt-5 py-2 rounded-2xl hover:bg-yellow hover:-translate-y-1 transition-all duration-500 text-yallow-bg hover:text-black font-semibold mb-2'}
        />
        
      </Form>
    </FormLayout>
  )
}
export default EmailVerify;