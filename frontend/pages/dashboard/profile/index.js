import Head from 'next/head';
import Script from 'next/script';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from '@/helper/axios.helper'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout';
import { faCoffee, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { NextResponse } from 'next/server'
import { pages } from '@/utils/contanst'
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap'
import { uploadFileToStorage } from '@/helper/firebase.helper'

// import '@/styles/globals.css'
//import { BsSun, BsFillMoonStarsFill, BsFillBellFill,BsFillGridFill } from "react-icons/bs"

export async function getServerSideProps({ req, res }) {
  const token = req.cookies["vechaitoken"]
  const { data } = await Axios({
    url: "/api/user/getbytoken",
    method: "GET",
    headers: { authorization: token },
  })
  if (!data) NextResponse.redirect(new URL('/login', request.url))

  return {
    props: {
      userData: data[0]
    },
  };
}

export default function Myprofile({ userData }) {
  const { fullname, name, email, accessApp,  image, address, phonenumber, id} = userData;
  console.log('My...',userData )
  const [profile, setProfile] = useState({
    email: email,
    fullname: fullname,
    phonenumber: phonenumber,
    address: address,
    image: image,
    id: id

  })
  const [File, setFile] = useState(profile.image)
  
  console.log(File)
  const [errMsg, setErrMsg] = useState(null)
  console.log(userData)

  const [layoutPages, setLayoutPages] = useState([])
  useEffect(() => {
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

  }, [])

  const handelLogout = () => {
    setCookie('vechaitoken', '')
    window.location.reload()

  }
  const handleProfile = () => {
    if(File === image) {
      console.log(11)
      profile.image = image
      console.log('imageee',image)
      axios.post('/api/user', { ...profile }).then(() => {
        // handleCreatedCB && handleCreatedCB()
        window.location.replace('/dashboard/profile')
        //goi nguoc lai ham me
  
      })
    }
   else{
    console.log('12')
    uploadFileToStorage(File).then((imgURL) => {
      profile.image = imgURL
      console.log('my profile', profile)
      axios.post('/api/user', { ...profile }).then(() => {
        // handleCreatedCB && handleCreatedCB()
        window.location.replace('/dashboard/profile')
        //goi nguoc lai ham me

      })
    }).catch(() => {
      setErrMsg('Tai anh len that bai')
    })
   }
 

  }

  

  return <>
    <Head>
      <title>Profile</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/assets/img/logo1.PNG" />
    </Head>
    <main>
      <Layout pages={layoutPages} user={{ fullname, email, name, image }}>
        <h3 style={{marginTop:'20px',textAlign:'center' }} className='profile_name'>PROFILE</h3>

        <Image
         loader={() => { return profile.image || "/assets/img/icon-profile.png" }}
        src="/assets/img/icon-profile.png"
        
          width={150}
          height={150}
          alt="Picture of the author"
          style={{marginLeft: '43%'}}
        />
        <h4>Xin chào {fullname}</h4>



        <Form style={{marginTop:'20px'}}>
          <FormGroup row>
            <Label for="email" sm={4}>
              Email
            </Label>
            <Col sm={8}>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={profile.email}
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    email: e.target.value
                  })
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="fullname" sm={4}>
              Họ và tên
            </Label>
            <Col sm={8}>
              <Input
                id="fullname"
                name="fullname"

                type="text" value={profile.fullname}
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    fullname: e.target.value
                  })
                }}

              />
            </Col>

          </FormGroup>
          <FormGroup row>
            <Label
              for="telephone"
              sm={4}
            >
              Số điện thoại
            </Label>
            <Col sm={8}>
              <Input
                id="telephone"
                name="telephone"
                type="text"
                value={profile.phonenumber}
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    phonenumber: e.target.value
                  })
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label
              for="address"
              sm={4}
            >
              Địa chỉ
            </Label>
            <Col sm={8}>
              <Input
                id="address"
                name="address"
                type="text"
                value={profile.address}
                onChange={(e) => {
                  setProfile({
                    ...profile,
                    address: e.target.value
                  })
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              for="image"
              sm={4}
            >
              Hình ảnh
            </Label>
            <Col sm={8}>
              <Input
                id="image"
                name="text"
                type="file"
               
                onChange={(e) => {
               
              setFile(e.target.files[0])
              console.log(e.target.files[0])

                            }}
                        />
            </Col>

          </FormGroup>
        </Form>
        <button className='profile_button_fix' onClick={(e) => {
          handleProfile()
        }}>Cập nhật hồ sơ</button>
      </Layout>

      {/* <!-- ======Section======= --> */}

      {/* <!-- ======End Section======= --> */}

      {/* <!-- End Dashboard --> */}
    </main>
    <Script src="/js/dashboard.js"></Script>
  </>

}


