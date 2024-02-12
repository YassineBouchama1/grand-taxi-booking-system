'use client'
import { signIn } from "next-auth/react";

export default function Home() {

      const handleSubmit = async () => {
    
        const loginData = {
            username: 'ata.username',
            password: 'ata.password',
            callbackUrl: '/',
            redirect: false,
        }

        const login = await signIn('credentials', loginData);

        console.log(login)
        if (login.ok) {
            // toast.success('Successfully Logged in! Redirecting...');
            // router.push(login.url);
        } else {
            // toast.error('Login failed.');
        }

    };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <button onClick={()=>handleSubmit()}>click</button>
    </main>
  )
}
