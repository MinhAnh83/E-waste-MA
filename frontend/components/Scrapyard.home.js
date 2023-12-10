import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from '@/helper/axios.helper'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NextResponse } from 'next/server'
import { pages } from '@/utils/contanst'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col , Table} from 'reactstrap';

export default function ScrapyardHome({ userData }) {
    const [Buyers, setBuyers] = useState([])
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });
    const [posts, setPosts] = useState([])
    const [Scrapyards, setScrapyards] = useState([])
    useEffect(() => {
        refesh()
        onRefresh()
        findBuyer()
    }, [])
    const refesh = () => {
       
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
      const findBuyer = () => {
        axios.get('/api/user').then((response) => {
            const { data } = response.data;
            console.log(data)
            let buyers = [];
            data.forEach((buyer, index) => {
                if (buyer.role_id == 2) {
                    buyers.push(buyer)
                }
            })
            setBuyers(buyers)

            console.log('buyers', buyers)
        })
    }
    const handleCreatedCB = () => {
        setModal(false)
        refesh()
    }
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const Showlist = () => {
        let all = document.querySelector(".table-all")
      
        if (modal1 == true) {
            all.style.visibility = 'visible';
        }
        else {
            all.style.visibility = 'hidden';
        }



        // 

    }
    return (
        <>
            <div className="heading" style={{ marginTop: 20 }}>
                <h2 style={{padding:'20px', textAlign:'center'}}>Địa chỉ các vựa ve chai </h2>
                <Row>
                    <Col xs="9">
                    <Map markerList={Scrapyards} center={(() => {
            return Scrapyards && Scrapyards[0] && Scrapyards[0].position
          })()} />
                    </Col>
               <Col xs="3" style={{ overflow: "auto", height:"289px", backgroundColor:"#e1f7ffbd",borderRadius:'10px',padding:'10px'}}>

              
            
               <h5 style={{color:"black", fontWeight:"600", textAlign:"center", fontSize:"18px", letterSpacing:"2px", backgroundColor:'white'}}>Danh sách các vựa</h5>
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
  
            <div className="section  flex-sb" >
            <h5 style={{textAlign:'center'}}>Danh sách người thu mua</h5>
            <Row>
                <Col xs="9">
                <div className='table-buyer'>
            <table hover style={{width:'700px'}} className='styled-table'>
                        <thead >
                            <tr style={{backgroundColor: '#009879'}}>
                              
                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Address
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Buyers ? Buyers.map((buyer, index) => {
                                return (
                                    <>
                                        <tr key={index} className='row-buyer'  >
                                         
                                            <td scope="row" >
                                                {buyer.fullname}
                                            </td>
                                            <td>
                                                {buyer.email}
                                            </td>
                                            <td style={{fontSize:'12px'}}>
                                                {buyer.address}
                                            </td>
                                            <div className='info-buyer-contact'>
                                        <p > Số điện thoại: {buyer.phonenumber} </p>
                                        </div>
                                        </tr>
                                        
                                      

                                    </>
                                )
                            }) : 'Không có người bán'}
                        </tbody>
                    </table>
            </div>
                </Col>
                <Col  xs="3">
                            
                            <p style={{ backgroundColor: 'aliceblue', borderLeft: '6px solid green', width:'200px', fontWeight:'600', padding:'10px', fontSize:'14px', color: 'black'}}>Hướng dẫn</p>
                            <div style={{backgroundColor:'white',color:'black', fontSize:'12px', textAlign:'justify', height: '200px', padding:'10px',borderRadius:'5px'}}>
                              <p>- Việc đưa ra các thông tin của người muốn mua các đồ điện tử bị hư hỏng sẽ giúp cho chủ vựa dễ dàng liên hệ để bán được với giá cao hơn.   </p> <br></br>
                             
                            </div>
                            </Col>
            </Row>
            
            
            
                <div className="section-left">
        
                    
                </div>

                {/* <!-- Section Right --> */}
              
            </div>

          
        </>
    )
}