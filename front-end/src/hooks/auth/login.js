'use client'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import axios from "@/lib/axios";
import { useState, useEffect } from 'react';
import userStorage from '../userstorage';

// user login hook
const Login = ({ userType, middleware }) => {
  const router = useRouter();
  const token = localStorage.getItem('Token');
  const userId = localStorage.getItem('id');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }
    if (middleware == 'guest' && user) router.push('/login')
    if (middleware == 'auth' && !user && error) router.push('/login')
  })

  const { data: user, error, mutate } = useSWR(`'http://bookstore.test/api/v1/${userType}/${userId}'`,
    () => axios.get(`${userType}/${userId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => {
      router.push(`/dashboard/${userType}`)
      userStorage({ userData: response.data.data });

    })
      .catch(error => {
        if (error.response.status != 409) throw error
        router.push('/auth/email/email-verify')
      }),
  )

  const csrf = () => axios.get('http://bookstore.test/sanctum/csrf-cookie')

  const userLogin = async ({ setErrors, ...props }) => {
    await csrf()
    setErrors([])
    axios.post(`login/${userType}`, props)
      .then((response) => {
        localStorage.setItem('Token', response.data.token);
        localStorage.setItem('id', response.data.data.id);
        
      })
      .catch(error => {
        if (error.response.status == 422) {
          setErrors(Object.values(error.response.data.errors).flat())
        } else {
          setErrors(Object.values(error.response.data).flat())
        }
      })
  }

  return {
    user,
    csrf,
    userLogin,
    isLoading,
  }

}
export default Login;