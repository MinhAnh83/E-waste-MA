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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CreatePost from './createPost';
import PostDashboard from './PostDashboard';
export default function Saler({ userData }) {
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });
    const [posts, setPosts] = useState([])
    useEffect(() => {
        refesh()
    }, [])
    const refesh = () => {
        axios.get('/api/post?limit=10').then((response) => {
            const { data } = response.data
            console.log(data)
            setPosts(data)
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
            <div className="heading" style={{ marginTop: 20 }}>
                <h2>MAP</h2>
                <Map />
            </div>
           
            <div className="section flex flex-sb" >
           
            
                <div className="section-left">
              <div className='create-post'>
               
             
              <Link href='/dashboard/'  onClick={toggle} style={{ marginTop: '30px' }}>
              <FontAwesomeIcon icon={faPlus} style={{ width: '20px', height: '20px', marginBottom: '3px' , marginRight:'10px'}} />
                        Tạo bài viết
                    </Link>
                </div>  
                    <PostDashboard posts={posts}></PostDashboard>
                </div>

                {/* <!-- Section Right --> */}
                <div className="section-right">

                    <div className="top-creators" style={{marginTop:'20px'}}>
                        <div className="heading flex flex-sb">
                            <h2>Top Salers</h2>
                            <p >See all</p>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn following">
                                Following
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Follow
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Follow
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Follow
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Follow
                            </a>
                        </div>

                        <div className="creator flex flex-sb">
                            <div className="follow-creator flex">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                    alt=""
                                />
                                <div className="creator-details">
                                    <h3>Hassnain Haider</h3>
                                    <p>@hassnain</p>
                                </div>
                            </div>

                            <a href="#" className="btn follow following">
                                Follow
                            </a>
                        </div>
                    </div>
                </div>
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