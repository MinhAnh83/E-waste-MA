import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneVolume, faHeadset, faComments, faTriangleExclamation, faClock, faLocationDot, faCheck } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import Script from 'next/script';
import Layout from '@/components/Layout';
import Image from "next/image";
import Axios from '@/helper/axios.helper';
import { pages } from '@/utils/contanst'
import Link from "next/link";
import { Table, Row, Col } from 'reactstrap';
import axios from "axios";
import Createscrapyard from "@/components/Createscrapyard";

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
export default function FindScrapyard({ userData }) {
    const [layoutPages, setLayoutPages] = useState(null)
    const [Scrapyarder, setScrapyarder] = useState([])
    const { fullname, name, email, accessApp, id, image } = userData;
    const [User, setUser] = useState(null)
    const [searchItem, setSearchItem] = useState('')
    const [modal1, setModal1] = useState(false);
    const [Scrapyards, setScrapyards] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });
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
          console.log('scrapyardall', data)
        })
      }
    const findscrapyarder = (user_id) => {
        console.log('user_id',user_id)
       if(user_id){
        axios.get(`/api/user?user_id=${user_id}`).then((response) => {
            const { data } = response.data;
            console.log('du lieu chu vua',data[0])
            
            setScrapyarder(data[0])

          
        })
       } 
    }
    const handleScrapyard = (scrapyard) => {
        console.log('buyeriii', scrapyard)
     
            setUser(scrapyard)
        
      
       
    }
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
        findscrapyarder()
        onRefresh()

    }, [])
    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        if (searchTerm == null) {
            setSearchItem(null)
        }
        setSearchItem(searchTerm)

        // filter the items using the apiUsers state

        const filteredItems = Scrapyards.filter((scrapyard) =>
            scrapyard.address.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredUsers(filteredItems);
    }
    const Showlist = () => {
        let all = document.querySelector(".table-all")
        setModal1(!modal1)
        if (modal1 == true) {
            all.style.visibility = 'visible';
        }
        else {
            all.style.visibility = 'hidden';
        }



        // 

    }
    const mybutton = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial",
        backgroundColor: '#30a9ffd9',
        fontWeight: '700',
        fontSize: '14px',
        border: 'none',
        borderRadius: '10px',
        marginTop: '30px', textAlign: 'center'
    };
    return (
        <>
            <Layout pages={layoutPages} user={{ fullname, email, name, image }} >

                <div style={{ marginTop: '30px' }}>
                    <h4>Danh sách vị trí của các vựa</h4>
                <Map markerList={Scrapyards} center={(() => {
            return Scrapyards && Scrapyards[0] && Scrapyards[0].position
          })()}/>
                    <h4 style={{textAlign:'center'}}>Danh sách các vựa </h4>
                    <input class="input-inset" type="text" value={searchItem} onChange={handleInputChange} placeholder="Tìm kiếm vựa gần nhất"></input>
                    <ul>
                        <Table hover style={{ marginTop: '20px' }}>
                            <thead>
                                <tr>
                                    <th>
                                        ID
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        open time
                                    </th>
                                    <th>
                                        Address
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers ? filteredUsers.map(scrapyard =>

                                    <tr key={scrapyard.id} onClick={(e) => { handleScrapyard(scrapyard) }}>
                                        <th scope="row"   >
                                            {scrapyard.id}
                                        </th>
                                        <td style={{fontSize:'12px'}}>
                                            {scrapyard.name}
                                        </td>
                                        <td style={{fontSize:'12px'}}>
                                            {scrapyard.open_time}
                                        </td>
                                        <td style={{fontSize:'12px'}}>
                                            {scrapyard.address}
                                        </td>
                                    </tr>


                                ) : 'Chưa nhập địa chỉ cần tìm'}
                            </tbody>
                        </Table>
                    </ul>
                    <button onClick={(e) => { Showlist() }} style={mybutton} >Xem tất cả các chủ vựa</button>
                    <Table hover className="table-all" style={{ marginTop: '20px', visibility: 'hidden' }}>
                        <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Open time
                                </th>
                                <th>
                                    Address
                                </th>
                            </tr>
                        </thead>
                        <tbody>


                            {Scrapyards ? Scrapyards.map((scrapyard, index) => {
                                return (
                                    <>
                                        <tr key={index} onClick={(e) => { handleScrapyard(scrapyard) }}>
                                            <th scope="row"   >
                                                {scrapyard.id}
                                            </th>
                                            <td style={{fontSize:'12px'}}>
                                                {scrapyard.name}
                                            </td>
                                            <td style={{fontSize:'12px'}}>
                                                {scrapyard.open_time}
                                            </td>
                                            <td style={{fontSize:'12px'}}>
                                                {scrapyard.address}
                                            </td>
                                        </tr>

                                    </>
                                )
                            }) : 'Không có người bán'}
                        </tbody>
                    </Table>
                    <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', margin: '25px' }}>
                        {User ? <>
                            <div >
                                <Row>
                                    <h6 style={{ textAlign: 'center', fontWeight: '600', color: 'black' }}>Thông tin của vựa</h6>
                                    <Col>

                                        <h7>Tên: <span>{User.name}</span></h7> <br></br>
                                        <h7>Địa chỉ: <span>{User.address}</span></h7> <br></br>
                                        <h7>Thời gian mở: <span>{User.open_time}</span></h7> <br></br>
                                    <button style={mybutton} onClick={(e)=>{findscrapyarder(User.user_id)}}>Xem thông tin của chủ vựa</button>   
  end                                      {Scrapyarder ? 
                                        <>
                                        <br></br>
                                       
                                        <h7 style={{marginTop:'20px'}}>Tên: {Scrapyarder.fullname}</h7> <br></br>
                                        <h7>Email: {Scrapyarder.email}</h7> <br></br>
                                        <h7>Số điện thoại: {Scrapyarder.phonenumber}</h7>
                                        </> : null}
                                    </Col>
                                    <Col>
                                        <div style={{ textAlign: 'center' }}>
                                            <Image
                                                loader={() => { return User.image || "https://via.placeholder.com/100x100" }}
                                                src="https://via.placeholder.com/100x100"
                                                alt="Picture of the author"
                                                width={200}
                                                height={200}

                                            />
                                        </div>
                                    </Col>

                                </Row>

                            </div>


                        </> : 'Chưa có vựa nào được tìm kiếm'}
                    </div>


                </div>
            </Layout>
        </>
    )
}
