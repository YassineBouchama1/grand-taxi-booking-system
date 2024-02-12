'use client'
 import { SignJWT, jwtVerify } from "jose";
 
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input){
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}


// save token to local storge
export async function createSessionClient(user) {
  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });
 

     localStorage.setItem('token',session)
     return true
}

export async function getSessionClient() {
  const session = localStorage.getItem('token')
  if (!session) return null;
   return await decrypt(session);
}

export async function logout() {
localStorage.removeItem('token')

}



