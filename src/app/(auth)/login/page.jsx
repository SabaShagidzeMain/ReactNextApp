'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


function Authorization() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  
  const handleSubmit = async (e) => {
      e.preventDefault();
      
      const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });
  
    const data = await response.json(); 
    
    if (response.ok && data.accessToken) {
      Cookies.set('accessToken', data.accessToken, { path: '/', secure: false, sameSite: 'Strict' });
console.log('token set:', data.accessToken);

    } else {
        console.log('login failed:', data.message);
    }
};

useEffect(() => {
  const token = Cookies.get('accessToken');
  if (token) {
    router.push('/');
  }
}, [router]);

  return (
    <section>
      
    </section>
  );
}

export default Authorization;
