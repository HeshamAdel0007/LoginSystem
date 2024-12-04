'use client'
import FormLayout from "@/components/auth/FormLayout";
import Button from "@/components/Button";
import { AtSymbolIcon } from "@heroicons/react/24/solid";
import Form from "next/form";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import axios from "@/lib/axios";
import { useRouter } from 'next/navigation'


const ForgotPassword = () => {
  const params = useParams();
  const router = useRouter();
  const type = params.type; // get user type [admin, publisher, customer]
  const [email, setEmail] = useState('');
  const [isErrors, setErrors] = useState(null);
  const [isSendCode, setSendCode] = useState(null);
  
  // send code rest password to mail
  const sendCode = async e => {
    e.preventDefault()
    axios.post(`/forgot-password/${type}`, {email})
      .then((response) => {
        setSendCode(response.data.message)
        router.push(`/auth/password/reset/${type}`)
      })
      .catch(error => {
        if (error) {
          setErrors(error.response.data.errors.email)
          }

      })

  }
  useEffect(() => {
     if (isErrors != null) {
        setSendCode(null)
      }
  },[isErrors])

  return (
    <FormLayout>
      <Form onSubmit={sendCode} className="bg-white rounded-md shadow-2xl p-5">
        <h1 className="text-gray-800 font-bold text-2xl">
          Forgot Password
        </h1>
        <small className="text-gray-400 font-semibold text-xs mb-1">
          Please click the button below to send Code... <br/>
        </small>
        <span className="mb-5 text-green-500 text-sm font-semibold">
          {isSendCode}
        </span>
        <span className="mb-5 text-red-500 text-sm font-semibold">
          {isErrors}
        </span>
        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
          <AtSymbolIcon className="h-5 w-5 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            className="pl-2 w-full outline-none border-none text-black"
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
            autoFocus
          />
        </div>
        <Button
          ButtonName={'Send Code'}
          ButtonType={'submit'}
          ButtonClass={'block w-full bg-black mt-5 py-2 rounded-2xl hover:bg-yellow hover:-translate-y-1 transition-all duration-500 text-yallow-bg hover:text-black font-semibold mb-2'}
        />
        
      </Form>
    </FormLayout>
  )
}

export default ForgotPassword