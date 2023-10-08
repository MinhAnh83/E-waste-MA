import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let cookie =request.cookies.get('vechaitoken')
  if(!cookie || !cookie.value) return NextResponse.redirect(new URL('/login', request.url))
  const {name,value}=cookie
  console.log('Cookiee:::',cookie)
  //name la ten 'vechaitoken', value la token
  fetch(process.env['SERVERHOST']+'/api/customer/authen',{
    method:'GET',
    headers:{
      'authorization':value
    },
  }).then(response=>response.json())
  .then((data)=>{
    console.log('Data:::',data )
    const {customerId, customerEmail, customerRole} = data
    Axios.defaults.headers.common['authorization'] = value;
  }).catch((err)=>{
    console.log(err)
  })
   
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}