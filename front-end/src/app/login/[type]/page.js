'use client'
import Link from "next/link";
import FormLayout from "@/components/auth/FormLayout";
import Errors from "@/components/Errors";
import Button from "@/components/Button";
import { useState } from "react";
import { useParams } from 'next/navigation';
import Form from 'next/form';
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import authLogin from "@/hooks/auth/login";

const Login = () => {
  const params = useParams()
  const UserLoginType = params.type;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  // login hook
  const { userLogin, isLoading, userType, user } = authLogin({
    userType: UserLoginType,
    middleware: 'gust'
  })

  // Login submit form
  const submitForm = async e => {
    e.preventDefault()
    userLogin({
      userType,
      email,
      password,
      setErrors,
    });
  }

  if (isLoading || user) {
    return <>Loading...</>
  }

  return (
    <FormLayout>
      <Form onSubmit={submitForm} className="bg-white rounded-md shadow-2xl p-5">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
        <p className="text-sm font-semibold text-gray-600 mb-8">you Login as a {params.type.toUpperCase()}</p>
        <Errors className="mb-5 text-red text-sm font-semibold" errors={errors} />
        <input
          type="text"
          id="userType"
          name={UserLoginType}
          value={UserLoginType}
          className="hidden"
          readOnly={true}
        />
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

        <Button
          ButtonName={'Login'}
          ButtonType={'submit'}
          ButtonClass={'block w-full bg-black mt-5 py-2 rounded-2xl hover:bg-yellow hover:-translate-y-1 transition-all duration-500 text-yallow-bg hover:text-black font-semibold mb-2'}
        />
        <div className="flex justify-between mt-4">
          <Link
            href="/auth/password/forgot"
            className="text-sm font-semibold ml-2 text-black hover:text-yellow cursor-pointer hover:-translate-y-1 duration-500 transition-all">
            Forgot Password ?
          </Link>

          <Link
            href="/register"
            className="text-sm font-semibold ml-2  text-black hover:text-yellow cursor-pointer hover:-translate-y-1 duration-500 transition-all">
            Dont have an account yet?
          </Link>
        </div>
      </Form>
    </FormLayout>
  )
}

export default Login;
