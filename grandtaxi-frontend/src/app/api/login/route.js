import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { json } from 'stream/consumers'


export async function POST(request) {


  cookies().set('token', request.body.data.token)

  return NextResponse.json({ token: 'yassine' ,status:true});
// cookies().set({
//     name: 'token',
//     value: 'yassineToken',
//     httpOnly: true,
//     path: '/',
//   })

}