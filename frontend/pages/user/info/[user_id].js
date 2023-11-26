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

import { Container } from 'reactstrap';


export async function getServerSideProps({ req, res, params }) {
  console.log('query',params)
  const { user_id } = params
  if(!user_id) throw new Error(`Loi`)

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

export default function Approve({ userData }){
    const { fullname,  email, id, image, address, phonenumber } = userData[0];
    console.log('fullname', fullname)

return(
    <>
    
    <Container style={{marginTop:'30px'}}>

    <div className='contactseller' style={{ padding:'20px',width:'1100px', textAlign:'center' }}>
                        <h6 style={{textAlign:'center', fontSize:'30px'}} className={styles.cardTitle}>Thông tin người muốn mua <span style={{color: 'red', fontSize:'40px'}}>{id}</span></h6>
                       
                        <div  style={{textAlign: 'center'}}>
                        <Image
                    loader={() => { return image || "https://via.placeholder.com/100x100" }}
                    src="https://via.placeholder.com/100x100"
                    alt="Picture of the author"
                    width={400}
                    height={400}
                    style={{    border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '5px',
                      boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)'}}
                  /> 
                        </div>
                      <br></br>
                        <h8 style={{ fontWeight: '700', letterSpacing: '2px' , color: 'black'}}><FontAwesomeIcon icon={faUser} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Người đăng:<span style={{ fontSize: '14px', fontWeight: '500' , color:'gray'}}>{fullname}</span></h8>
               <br></br>
                        <h8 style={{ fontWeight: '700', letterSpacing: '2px', color: 'black' }}><FontAwesomeIcon icon={faEnvelope} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Email: <span style={{ fontSize: '14px', fontWeight: '500', color:'gray' }}>{email}</span></h8><br />
                        <h8 style={{ fontWeight: '700', letterSpacing: '2px' , color: 'black'}}><FontAwesomeIcon icon={faMapLocationDot} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Địa chỉ: <span style={{ fontSize: '14px', fontWeight: '500' , color:'gray' }}>{address}</span></h8>


                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                          <h6 style={{ fontWeight: '700', fontSize: '17px', color: 'Black' }}>Liên hệ với người bán</h6>
                          <button className='button-contact'><FontAwesomeIcon icon={faPhoneVolume} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Gọi  {phonenumber}</button> <br></br>
                          <button className='button-chat'><FontAwesomeIcon icon={faComments} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} />Chat với người bán</button> <hr/>
                          <div>
<FontAwesomeIcon style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} icon={faPhoneVolume} />
<FontAwesomeIcon style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} icon={faTwitter} />
<FontAwesomeIcon  style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} icon={faInstagram} />
  </div>
                        </div>


                      </div>
    </Container>
  
  
 
    </>
)
}