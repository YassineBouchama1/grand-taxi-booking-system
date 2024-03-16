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


// save user object to local storge
export async function createSession(user) {
  // Create the session object
  const expires = new Date(Date.now() + 10 * 1000);

  const session = {
    expires,
    name: user.name,
    email: user.email,
    profile_photo: user.profile_photo,
    role_id: user.role_id,
    status: user.status,
    contact_info: user.contact_info,
  };

  // Stringify the session object before saving it
  const sessionString = JSON.stringify(session);

  // Save the session in local storage
  const sessionCrypted = await encrypt(sessionString);
  localStorage.setItem("session", sessionCrypted);

  return true;
}

 



export async function getSessionClient() {
  const sessionString = localStorage.getItem('session')
  

  console.log(session)
  if (!session) return null;
    const session = JSON.parse(sessionString);
   return await decrypt(session);
}


export async function logout() {
localStorage.removeItem('token')
localStorage.removeItem('user')

}



