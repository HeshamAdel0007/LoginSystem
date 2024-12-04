'use client'
import FormLayout from "@/components/auth/FormLayout";
import Button from "@/components/Button";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import Form from "next/form";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import axios from "@/lib/axios";
import Errors from "@/components/Errors";
import { useRouter } from 'next/navigation';


const ResetPassword = () => {
  const router = useRouter();
  const params = useParams();
  const type = params.type; // get user type [admin, publisher, customer]
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([]);
  const [isResetCode, setResetCode] = useState(null);
  
  // reset password
  const resetPassword = async e => {
    e.preventDefault()
    axios.post(`/reset-password/${type}`, {code, password, password_confirmation})
      .then((response) => {
        setResetCode(response.data.message)
        router.push(`/login/${type}`)
      })
      .catch(error => {
          setErrors(Object.values(error.response.data.errors).flat())
      })

  }
  useEffect(() => {
     if (errors != null) {
        setResetCode(null)
     }
  },[errors])

  return (
    <FormLayout>
      <Form onSubmit={resetPassword} className="bg-white rounded-md shadow-2xl p-5">
        <h1 className="text-gray-800 font-bold text-2xl">
          Reset Password
        </h1>
        <small className="text-gray-400 font-semibold text-xs mb-1">
          Please click the button below to reset password... <br/>
        </small>
        <span className="mb-5 text-green-500 text-sm font-semibold">
          {isResetCode}
        </span>
        <Errors className="mb-5 text-red text-sm font-semibold" errors={errors} />
        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
          <AtSymbolIcon className="h-5 w-5 text-gray-400" />
          <input
            id="code"
            name="code"
            type="text"
            value={code}
            className="pl-2 w-full outline-none border-none text-black"
            onChange={e => setCode(e.target.value)}
            placeholder="code"
            autoFocus
          />
        </div>
        <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
          <LockClosedIcon className="h-5 w-5 text-gray-400" />
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            className="pl-2 w-full outline-none border-none text-black"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            autoComplete="off"
          />
        </div>

        <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
          <LockClosedIcon className="h-5 w-5 text-gray-400" />
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={password_confirmation}
            className="pl-2 w-full outline-none border-none text-black"
            onChange={e => setPasswordConfirmation(e.target.value)}
            placeholder="Password Confirmation"
            autoFocus
            autoComplete="off"
          />
        </div>
        <Button
          ButtonName={'ResetPassword'}
          ButtonType={'submit'}
          ButtonClass={'block w-full bg-black mt-5 py-2 rounded-2xl hover:bg-yellow hover:-translate-y-1 transition-all duration-500 text-yallow-bg hover:text-black font-semibold mb-2'}
        />
        
      </Form>
    </FormLayout>
  )
}

export default ResetPassword