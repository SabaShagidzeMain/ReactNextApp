'use client'
import { usePathname, useRouter } from 'next/navigation'
import  { useEffect } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'



const AuthChecker = ({children}) => {
    const router = useRouter();
    const pathname = usePathname();
    const token = Cookies.get('sccessToken');

    useEffect(() =>{
        if(!token && pathname !== 'login'){
            router.push('/login');
        }
    },[pathname,token,router])

    if(!token && pathname === '/login'){
        <Link to = {'/login'}> <button>Go to Login</button></Link>
    }

  return (
    <div>children</div>
  )
}

export default AuthChecker