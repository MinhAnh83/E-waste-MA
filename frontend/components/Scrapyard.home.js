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

export default function ScrapyardHome({ userData }) {
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });
    const [posts, setPosts] = useState([])
    const [Scrapyards, setScrapyards] = useState([])
    useEffect(() => {
        refesh()
        onRefresh()
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
    const handleCreatedCB = () => {
        setModal(false)
        refesh()
    }
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <div className="heading" style={{ marginTop: 20 }}>
                <h2>Địa chỉ các vựa ve chai </h2>
                <Map markerList={Scrapyards} center={(() => {
            return Scrapyards && Scrapyards[0] && Scrapyards[0].position
          })()}/>
            </div>
           
            <div className="section flex flex-sb" >
           
            
                <div className="section-left">
        
                    
                </div>

                {/* <!-- Section Right --> */}
                <div className="section-right">

                    <div className="top-creators" style={{marginTop:'20px'}}>
                        <div className="heading flex flex-sb">
                            <h2>Bảng xếp hạng người thu mua</h2>
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

          
        </>
    )
}