'use client'
import { usePathname, useRouter } from 'next/navigation'
import  { useEffect } from 'react'
import Cookies from 'js-cookie'


const AuthChecker = ({children}) => {
    const router = useRouter();
    const pathname = usePathname();
    const token = Cookies.get('accessToken');

    useEffect(() =>{
        if(!token && pathname !== '/login'){
            router.push('/login');
        }
    },[pathname,token,router])

  return (
    <div>{children}</div>
  )
}

export default AuthChecker