import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from '@/helper/axios.helper'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout';
import { faPlus, faPhoneVolume, faHeadset, faComments, faTriangleExclamation, faClock, faLocationDot, faCheck } from '@fortawesome/free-solid-svg-icons'
import { NextResponse } from 'next/server'
import { pages } from '@/utils/contanst'
import Createscrapyard from '@/components/Createscrapyard';
import Updatescrapyard from '@/components/Updatescrapyard';
import { Button, Row, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Label, Col, Input, Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import { NULL } from 'sass';
//  import '@/styles/globals.css'
//import { BsSun, BsFillMoonStarsFill, BsFillBellFill,BsFillGridFill } from "react-icons/bs"

export async function getServerSideProps({ req, res }) {
  const token = req.cookies["vechaitoken"];
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

export default function DetailPost({ userData }) {
  const router = useRouter()
  console.log(router.query.post_id)
  const { fullname, name, email, accessApp, id, image } = userData;
  const [post, setPost] = useState([])
  const [User, setUser] = useState([])

  const [layoutPages, setLayoutPages] = useState(null)
  let userpost = null;
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
    refesh()



  }, [])

  const refesh = () => {
    axios.get(`/api/post/detailpost?post_id=${router.query.post_id}`).then(async (response) => {
      const { data } = response.data;
      console.log('haha', data);
      setPost(data)
      console.log('post', data)
      console.log('uus', data[0].user_id);


      return data[0].user_id

    }).then((userId) => {
      console.log('userid', userId)
      axios.get(`/api/user?user_id=${userId}`).then((response) => {
        const { data } = response.data;
        setUser(data)
        console.log('daadd', data)
      })
    })
  }


  return (
    <>
      <Layout pages={layoutPages} user={{ fullname, email, name, image }} >
        <h3>Hello</h3>
        {post ? post.map((post, index) => {
          return (
            <div key={index}>
              <Row>
                <Col>
                  <Image
                    loader={() => { return post.image || "https://via.placeholder.com/100x100" }}
                    src="https://via.placeholder.com/100x100"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />

                  <div style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '5px', padding: '15px' }}>
                    <h4 style={{ color: 'black', fontWeight: '700' }}>{post.name}</h4>
                    <h7 style={{ color: 'red', fontWeight: '600' }}>{post.expect_price} đ</h7>
                    <p><FontAwesomeIcon icon={faLocationDot} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} />{post.address}</p>
                    <p><FontAwesomeIcon icon={faClock} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} />Đăng lúc {post.updateAt}</p>
                    <p><FontAwesomeIcon icon={faCheck} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} />Tin đã được kiểm duyệt</p>
                  </div>
                  <div style={{ marginTop: '10px', backgroundColor: 'white', borderRadius: '5px', padding: '15px' }} >
                    <h5 style={{ color: 'black' }}>Mô tả chi tiết</h5>
                    <p>{post.content}</p>
                  </div>
                </Col>



                <Col>
                  {User ? User.map((user, index) => {
                    return (
                      <div key={index} className='contactseller'>
                        <h8 style={{ fontWeight: '700', letterSpacing: '2px' }}>Người đăng:</h8>
                        <p>{user.fullname}</p>
                        <h8 style={{ fontWeight: '700', letterSpacing: '2px' }}>Email: <span style={{ fontSize: '14px', fontWeight: '500' }}>{user.email}</span></h8><br />
                        <h8 style={{ fontWeight: '700', letterSpacing: '2px' }}>Địa chỉ: <span style={{ fontSize: '14px', fontWeight: '500' }}>{user.address}</span></h8>


                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                          <h6 style={{ fontWeight: '700', fontSize: '17px', color: 'Black' }}>Liên hệ với người bán</h6>
                          <button className='button-contact'><FontAwesomeIcon icon={faPhoneVolume} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Gọi  {user.phonenumber}</button> <hr />
                          <button className='button-chat'><FontAwesomeIcon icon={faComments} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} />Chat với người bán</button>
                        </div>


                      </div>

                    )


                  }) : null}
                  <Row style={{ marginTop: '20px', padding: '10px' }}>
                    <Col>
                      <FontAwesomeIcon icon={faHeadset} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} /> Cần trỡ giúp
                    </Col>
                    <Col>
                      <FontAwesomeIcon icon={faTriangleExclamation} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} />Báo cáo tin này
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          )

        }) : null}

        <Row style={{ padding: '20px', backgroundColor: 'white', borderRadius: '5px', marginTop: '10px' }}>
          <h6 style={{ color: 'black', fontWeight: '600' }}>Tin rao khác của {post[0] ? post[0].fullname : NULL}</h6>
          <Card
            style={{
              width: '18rem'
            }}
          >
            <img
              alt="Sample"
              src="https://picsum.photos/300/200"
            />
            <CardBody>
              <CardTitle tag="h5">
                Card title
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
              >
                Card subtitle
              </CardSubtitle>
              <CardText>
                Some quick example text to build on the card title and make up the bulk of the card‘s content.
              </CardText>
              <Button>
                Button
              </Button>
            </CardBody>
          </Card>
         

      </Row>

    </Layout >
    </>
  )
}
