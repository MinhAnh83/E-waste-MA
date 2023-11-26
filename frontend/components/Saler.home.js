import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Axios from '@/helper/axios.helper'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NextResponse } from 'next/server'
import { pages } from '@/utils/contanst'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Table } from 'reactstrap';
import CreatePost from './createPost';
import PostDashboard from './PostDashboard';
export default function Saler({ userData }) {
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });
    const [Scrapyards, setScrapyards] = useState([])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        refesh()
        onRefresh()
    }, [])
    const refesh = () => {
        axios.get('/api/post?limit=10').then((response) => {
            const { data } = response.data
            console.log(data)
            setPosts(data)
        })
    }
    const onRefresh = () => {
        axios.get(`/api/myscrapyard`).then((response) => {
          const { data } = response.data;
          console.log('danh sachy', data)
          data.forEach((d) => {
            d["position"] = d.langlat.split(', ')
            d["popupContent"] = `
             ${d.name}\
            ${d.address}
            `
            // them 2 cai key la position va popupContent vao Myscarpyard
          })
          setScrapyards(data)
        })
      }
    const handleCreatedCB = () => {
        setModal(false)
        refesh()
    }
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <div className="heading" style={{ marginTop: '20px' }}>
                <h2>Bản đồ vị tri các vựa ve chai</h2>
                <Row>
                    <Col xs="9">
                    <Map markerList={Scrapyards} center={(() => {
            return Scrapyards && Scrapyards[0] && Scrapyards[0].position
          })()} />
                    </Col>
               <Col xs="3" style={{ overflow: "auto", height:"289px", backgroundColor:"#e1f7ffbd",borderRadius:'10px',padding:'10px'}}>

              
            
               <h5 style={{color:"black", fontWeight:"600", textAlign:"center", fontSize:"18px", letterSpacing:"2px"}}>Danh sách các vựa</h5>
              {Scrapyards && Scrapyards.map((scrapyards, index) => {
                return (
                  <div  key={index} >
                     <Row>
                    
                        <Col sx="2" sm="2" md="2">
                           
                        <Image
                                    src="/assets/img/icon-location.png"
                                    width={40}
                                    height={40}
                                    alt="Picture of the author"
                                />
                        </Col>
                         <Col sx="11">
                         <p style={{fontSize:'15px', color:"black",fontWeight:"600"}}>{scrapyards.name}</p>  
                       
                       
                         <p style={{fontSize:'10px',marginTop:'-9px',color:'#656472'}}>{scrapyards.address}</p>  
                         
                         
                       
                           </Col>
                       
                       
                     </Row>
                    
                   
                  </div>
                )
              })}


          
       
               </Col>
                </Row>
               
            </div>
           
            <div className="section flex flex-sb" >
           
            
                <div className="section-left">
              <div className='create-post'>
               
             
              <Link href='/dashboard/'  onClick={toggle} style={{ marginTop: '30px' }}>
              <FontAwesomeIcon icon={faPlus} style={{ width: '20px', height: '20px', marginBottom: '3px' , marginRight:'10px'}} />
                        Đăng bài bán
                    </Link>
                </div>  
                    <PostDashboard posts={posts}></PostDashboard>
                </div>

                {/* <!-- Section Right --> */}
               
            </div>

            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} style={{ textAlign: 'center', fontSize: '12px' }}>Tạo bài viết</ModalHeader>
                <ModalBody>

                    <CreatePost userData={userData} handleCreatedCB={handleCreatedCB}></CreatePost>

                </ModalBody>

            </Modal>
        </>
    )
}