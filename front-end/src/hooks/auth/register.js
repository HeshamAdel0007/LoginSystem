'use client'
import { useRouter } from 'next/navigation'
import axios from "@/lib/axios";

// user register hook
const Register = ({ userType }) => {
  const router = useRouter()

  const csrf = () => axios.get('http://bookstore.test/sanctum/csrf-cookie')

  const userRegister = async ({ setErrors, ...props }) => {
    await csrf()
    setErrors([])
    axios.post(`register/${userType}`, props)
      .then(() => {
        router.push(`/login/${userType}`)
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
    csrf,
    userRegister,
  }
}
export default Register;