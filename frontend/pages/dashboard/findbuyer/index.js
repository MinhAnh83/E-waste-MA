import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneVolume, faHeadset, faComments, faTriangleExclamation, faClock, faLocationDot, faCheck } from '@fortawesome/free-solid-svg-icons'

import Script from 'next/script';
import Layout from '@/components/Layout';
import Image from "next/image";
import Axios from '@/helper/axios.helper';
import { pages } from '@/utils/contanst'
import Link from "next/link";
import { Table, Row, Col } from 'reactstrap';
import axios from "axios";

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
export default function FindBuyer({ userData }) {
    const [layoutPages, setLayoutPages] = useState(null)
    const [Buyers, setBuyers] = useState([])
    const { fullname, name, email, accessApp, id, image } = userData;
    const [User, setUser] = useState(null)
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
    const handleBuyer = (buyer) => {
        console.log('buyeriii', buyer)
        setUser(buyer)
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
        findBuyer()

    }, [])
    return (
        <>
            <Layout pages={layoutPages} user={{ fullname, email, name, image }} >

                <div style={{ marginTop: '30px' }}>
                    <h4 style={{ textAlign: 'center' }}>Danh sách người thu mua</h4>
                    <input class="input-inset" type="text" placeholder="Tìm kiếm người thu mua gần nhất"></input>
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
                                        <tr key={index} onClick={(e) => { handleBuyer(buyer) }}>
                                            <th scope="row"   >
                                                {buyer.id}
                                            </th>
                                            <td>
                                                {buyer.fullname}
                                            </td>
                                            <td>
                                                {buyer.email}
                                            </td>
                                            <td>
                                                {buyer.address}
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
                                <h6 style={{ textAlign: 'center', fontWeight: '600', color: 'black' }}>Thông tin người thu mua</h6>
                                    <Col>
                                      
                                        <h7>Tên: <span>{User.fullname}</span></h7> <br></br>
                                        <h7>Địa chỉ: <span>{User.address}</span></h7> <br></br>
                                        <h7>Email: <span>{User.email}</span></h7> <br></br>
                                        <h7>Số điện thoại: <span>{User.phonenumber}</span></h7><br></br>
                                        <button className='button-contact'><FontAwesomeIcon icon={faPhoneVolume} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} />
                                            <Link href={`tel:${User.phonenumber}`} > Gọi  {User.phonenumber}</Link>
                                        </button> <br></br>
                                        <button className='button-chat'><FontAwesomeIcon icon={faComments} style={{ width: '15px', height: '15px', marginTop: '5px', marginRight: '10px' }} />Chat với người thu mua</button><hr />
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


                        </> : 'Chưa có người bán nào được tìm kiếm'}
                    </div>


                </div>
            </Layout>
        </>
    )
}