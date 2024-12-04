'use client'
import { useState, useEffect } from "react";

/**
 * check if user authentication or not 
 */
const CheckAuth = ({ userToken }) => {
  const token = userToken;
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (token != null) {
      setAuth(true)
    }
  }, [token])

  return (
    auth
  )
}

export default CheckAuth