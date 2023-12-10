import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import styles from '@/styles/login/index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from '@/helper/axios.helper'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout';
import {  faPhoneVolume, faComments, faEnvelope, faMapLocationDot, faUser , faFacebook, faTwitter, faInstagram} from '@fortawesome/free-solid-svg-icons'

import { pages } from '@/utils/contanst'

import { Container,  Spinner, Toast, ToastHeader, ToastBody } from 'reactstrap';


// export async function getServerSideProps({ req, res }) {
//   console.log('query',params)
//   const { user_id } = params
//   if(!user_id) throw new Error(`Loi`)

//   const { data } = await Axios({
//     url: `/api/user/get?user_id=${user_id}`,
//     method: "GET"
// })
// const user = data.data;
//   if(!user) throw new Error(`Loi`)

//   return {
//     props: {
//       userData: user
//     },
//   };
// }

export default function Approve(){
    const [email,setEmail] =useState(null);
    const [Error,setError]=useState(null);
    const [showA, setShowA] = useState(false);
    const [Success,setSuccess] =useState(null);
   
    const [sendmail, setsendMail] = useState({
        to: null,
        subject: null,
        text: "Xin chao ban",
        html: null
    })
useEffect(()=>{

},[])
const getUser=()=>{
    axios.post(`/api/verifyemail`,{...email}).then((res)=>{
        const {data} =res.data;
        const result = data.result;
        console.log('hihi',result);
        setSuccess("Đã gửi mail tành công. Mời bạn vào gmail để xác nhận. ")
        return result;
    }).then((response) => {
        console.log('lay mail nha', response.email)
        sendmail.to = response.email
        sendmail.html = `
        <a src="http://localhost:3000/setpassword/1">Chap nhan</a>
        `
        sendmail.subject = `Người mua `
        // axios.post('/api/mail', { ...sendmail })
       
    }).catch((error)=>{
        console.log('eeee')
        setError('Tên đăng ký không tồn tại')
        setShowA(!showA);
    })
}  
const toggleShowA = () => setShowA(!showA);

return(
    <>
   

  <div className="mainDiv">
  
  <div className="cardStyle">
  {Error ?
              <div style={{marginLeft:'40px'}}>
                <Toast isOpen={showA}  >
                  <ToastHeader icon="primary" toggle={toggleShowA}>
                    Information !!
                  </ToastHeader>
                  <ToastBody>
                    {Error}
                  </ToastBody>
                </Toast>
              </div>
              : null}
            {Success ?
              <div style={{marginLeft:'40px'}}>
                <Toast isOpen={showA}  >
                  <ToastHeader icon="primary" toggle={toggleShowA}>
                    Information !!
                  </ToastHeader>
                  <ToastBody>
                    {Success}
                  </ToastBody>
                </Toast>
              </div>
              : null}    
    <div >
      
     
      
      <h2 className="formTitle">
    Input your email
      </h2>
      
    <div className="inputDiv">
      <label className="inputLabel" for="password">Email</label>
      <input placeholder='Input your email' onChange={(e) => {
                                setEmail({
                                    ...email,
                                    email: e.target.value
                                })
                            }} /> 
    </div>
      
   
    
    <div className="buttonWrapper">
      <button onClick={(e)=>{getUser()}} className="submitButton pure-button pure-button-primary">
        <span>Continue</span>
       
      </button>
    </div>
      
  </div>
  </div>
</div>
 
    </>
)
}