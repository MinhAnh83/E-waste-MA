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

import { Container , Toast, ToastHeader, ToastBody } from 'reactstrap';


export async function getServerSideProps({ req, res, params }) {
    console.log('query',params)
    const { user_id } = params
    if(!user_id) throw new Error(`Loi`)
  console.log('userid',user_id)
    const { data } = await Axios({
      url: `/api/user/get?user_id=${user_id}`,
      method: "GET"
  })
  const user = data.data;
    if(!user) throw new Error(`Loi`)
  
    return {
      props: {
        userData: user
      },
    };
  }

export default function Approve({userData}){
  const [showA, setShowA] = useState(false);
    const [email,setEmail] =useState(userData[0].email);
    const [password,setPassword] =useState(null);
    const [userid,setId]=useState(userData[0].id);
     const [rePassword,setRepassword] = useState(null)
    console.log('uaserr',email)
    const [Error,setError]=useState(null);
    const toggleShowA = () => setShowA(!showA);
    const resetPassword=()=>{

        if(password.password != rePassword.rePassword){

          console.log('khac')
          console.log(password)
          console.log(rePassword)
            setError('Mật khẩu nhập lại không khớp')
            setShowA(!showA);
        }
        if(password.password == rePassword.rePassword){
          console.log('giong')
            axios.post(`/api/setpassword/`,{ ...password, id: userid  })
            window.location.replace('/login')
        }
      
    }
useEffect(()=>{

},[])

return(
    <>


  <div className="mainDiv">
  <div className="cardStyle">
    <div >
    <Toast isOpen={showA} style={{marginLeft:'30px'}} >
                  <ToastHeader icon="danger" toggle={toggleShowA}>
                    Danger !!
                  </ToastHeader>
                  <ToastBody>
                    {Error}
                  </ToastBody>
                </Toast>
     
      
      <h2 className="formTitle">
        Login to your account
      </h2>
      
    <div className="inputDiv">
      <label className="inputLabel" for="password">New Password</label>
      <input type="password" id="password" name="password" required onChange={(e)=>{
        setRepassword({...rePassword, rePassword:e.target.value} )
      }}/>
    </div>
      
    <div className="inputDiv">
      <label className="inputLabel" for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" name="confirmPassword"onChange={(e)=>{
        setPassword({...password, password:e.target.value} )
      }}/>
    </div>
    
    <div className="buttonWrapper">
      <button   onClick={(e)=>{resetPassword()}}  className="submitButton pure-button pure-button-primary">
        <span>Verify</span>
        
      </button>
    </div>
      
  </div>
  </div>
</div>
 
    </>
)
}
