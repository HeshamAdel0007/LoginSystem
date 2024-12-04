'use client'
import { usePathname } from 'next/navigation';
import FormLayout from "@/components/auth/FormLayout";
import Button from "@/components/Button";
import Form from 'next/form';
import axios from "@/lib/axios";
import { useState } from 'react';

const Verification = () => {
  /**
   * use pathname & params to explode url come form backend
   * explode url  from [www.example.com / auth / verify/ id / hash / Signed / expire ]
   * to url [id / hash / Signed / expire]
   */
  const pathname = usePathname();
  const params = window.location.search;

  const [isErrors, setErrors] = useState('');
  const [isSendLink, setSendLink] = useState('');


  // verify email
  const sendEmailVerification = async e => {
    e.preventDefault()
    const token = localStorage.getItem('Token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    axios.get(`/verify-email/${pathname.slice(13)}${params}`, config)
      .then((response) => {
        localStorage.setItem('email_verified_at', Date.now());
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
          Verification E-Mail
        </h1>
        <span className="mb-5 text-red-500 text-sm font-semibold">
          { isErrors }
        </span>
        { isSendLink ?
            <span className="mb-5 text-green-500 text-sm font-semibold">
            {isSendLink}
            </span>
            :
            <span className="mb-5 text-black  text-sm font-semibold">
              <br/>Please click the button below to verification your e-mail....
            </span>
        }
        <Button
          ButtonName={'Verification'}
          ButtonType={'submit'}
          ButtonClass={'block w-full bg-black mt-5 py-2 rounded-2xl hover:bg-yellow hover:-translate-y-1 transition-all duration-500 text-yallow-bg hover:text-black font-semibold mb-2'}
        />
        
      </Form>
    </FormLayout>
  )
}

export default Verification;