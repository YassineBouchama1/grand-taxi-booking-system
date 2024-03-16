'use server'
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


 
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
export async function createSession(user) {
  // Verify credentials && get the user


  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);

const sessionObject = {

    name: user.name,
    email: user.email,
    profile_photo: user.profile_photo,
    role_id: user.role_id,
    status: user.status,
    contact_info: user.contact_info,
  };
    const sessionString = JSON.stringify(sessionObject);

  const sessionCrypted = await encrypt(sessionString);

  // Save the session in a cookie
  cookies().set("session", sessionCrypted, { expires, httpOnly: true });

     return true
}





export async function getSession() {
  const sessionString = cookies().get("session")?.value;


  if (!sessionString) return null;
      const sessionCrypted = await decrypt(sessionString);
        // const session = JSON.stringify(sessionCrypted);
  return JSON.stringify(sessionCrypted);
}

export async function logoutCookies() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}
// export async function updateSession(request) {
//   const session = request.cookies.get("session")?.value;
//   if (!session) return;

//   // Refresh the session so it doesn't expire
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + 10 * 1000);
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "session",
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//   });
//   return res;
// }