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

import { Button, Row, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Label, Col, Input, Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';


export async function getServerSideProps({ req, res }) {
  const router = useRouter()
  console.log('query',router.query.user_id)

  return {
    props: {
      userData: {}
    },
  };
}

export default function Approve({ userData }){
  const router = useRouter()
  console.log('query',router.query.user_id)
  const { fullname, name, email, accessApp, id, image } = userData;
  const [User, setUser] = useState([])
  
  const [layoutPages, setLayoutPages] = useState(null)
  

  const refesh = () => {
    axios.get(`/api/user?user_id=${router.query.user_id}`).then(async (response) => {
      const { data } = response.data;
      console.log('haha', data);
      setUser(data)
    
    })
  }
 useEffect( ()=>{
  const accessAppList = accessApp.split(', ')
  if (accessAppList && Array.isArray(accessAppList)) {
    let foundePages = []
    pages.forEach((page, index) => {
      if (accessAppList.includes(page.key)) {
        foundePages.push(page)
      }
    })
    setLayoutPages(foundePages)

  }
  refesh()
 },[])

return(
    <>
    <Layout pages={layoutPages} user={{ fullname, email, name, image }} >

 
    <Row style={{marginTop: '30px'}}>
                  {User ? User.map((user, index) => {
                    return (
                      
                      <div key={index} className='contactseller' style={{ padding:'20px'}}>
                        <h6 style={{textAlign:'center', fontSize:'30px'}} className={styles.cardTitle}>Thông tin người muốn mua <span style={{color: 'red', fontSize:'40px'}}>{user.id}</span></h6>
                       
                        <div  style={{textAlign: 'center'}}>
                        <Image
                    loader={() => { return user.image || "https://via.placeholder.com/100x100" }}
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
                        <h8 style={{ fontWeight: '700', letterSpacing: '2px' , color: 'black'}}><FontAwesomeIcon icon={faUser} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Người đăng:<span style={{ fontSize: '14px', fontWeight: '500' , color:'gray'}}>{user.fullname}</span></h8>
               <br></br>
                        <h8 style={{ fontWeight: '700', letterSpacing: '2px', color: 'black' }}><FontAwesomeIcon icon={faEnvelope} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Email: <span style={{ fontSize: '14px', fontWeight: '500', color:'gray' }}>{user.email}</span></h8><br />
                        <h8 style={{ fontWeight: '700', letterSpacing: '2px' , color: 'black'}}><FontAwesomeIcon icon={faMapLocationDot} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Địa chỉ: <span style={{ fontSize: '14px', fontWeight: '500' , color:'gray' }}>{user.address}</span></h8>


                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                          <h6 style={{ fontWeight: '700', fontSize: '17px', color: 'Black' }}>Liên hệ với người bán</h6>
                          <button className='button-contact'><FontAwesomeIcon icon={faPhoneVolume} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Gọi  {user.phonenumber}</button> <br></br>
                          <button className='button-chat'><FontAwesomeIcon icon={faComments} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} />Chat với người bán</button> <hr/>
                          <div>
<FontAwesomeIcon style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} icon={faFacebook} />
<FontAwesomeIcon style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} icon={faTwitter} />
<FontAwesomeIcon  style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} icon={faInstagram} />
  </div>
                        </div>


                      </div>

                    )


                  }) : null}
                
                </Row>
    </Layout>
  
 
    </>
)
}