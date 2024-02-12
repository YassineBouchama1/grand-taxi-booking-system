'use client'


export async function login(token) {
 
     localStorage.setItem('token',token)
     return true
}

export async function logout() {
localStorage.removeItem('token')

}


export async function getSession() {
  const session = localStorage.getItem('token')
  if (!session) return null;
  return session;
}
