'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import './login.css'

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
      router.push('/'); 
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
    <section className='login-wrapper'>
    <div className='bc-image'>
        <form className='form' onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <div>
                <input className='input'
                type="text"
                value={username}
                required
                placeholder='Enter Your Username...'
                onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <input className='input'
                type="password"
                value={password}
                required
                placeholder='Enter Your Password'
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button  className='login-button' type='submit'>Log In</button>
        </form>
    </div>
    </section>
  );
}

export default Authorization;
