'use server'
 
import { cookies } from 'next/headers'
 
export async function createSession(token,user) {
  cookies().set('token', token)
  cookies().set('user', user)
//   // or
//   cookies().set('name', 'lee', { secure: true })
//   // or
//   cookies().set({
//     name: 'name',
//     value: 'lee',
//     httpOnly: true,
//     path: '/',
//   })
}


export async function getSession() {
  const session = cookies().get("token")?.value;
  if (!session) return null;
  return session;
}