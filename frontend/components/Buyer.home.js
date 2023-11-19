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


export default function Buyer() {
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
   
    function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign +
                (j ? i.substr(0, j) + thousands : '') +
                i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    };
    return (
        <>
            <div className="heading" style={{ marginTop: '20px', textAlign: 'center' }}>
                <h2>Địa chỉ các vựa thu gom</h2>
                <Map markerList={Scrapyards} center={(() => {
                    return Scrapyards && Scrapyards[0] && Scrapyards[0].position
                })()} />
            </div>

            <div className="section flex flex-sb" >
                <div className="section-left">
                    <div className="nfts">
                        <div className="trending heading flex flex-sb " style={{ marginTop: "20px" }}>
                            <h2>Các bài đăng phổ biến</h2>
                        </div>

                        {/* <!-- =====Browse NFT===== --> */}
                        <div className="browse">

                            {posts.map((post, index) => {
                                return (

                                    <div className="nft" key={index}>

                                        <div>
                                            <Image
                                                loader={() => { return post.image || "https://via.placeholder.com/100x100" }}
                                                src="https://via.placeholder.com/100x100"
                                                width={268}
                                                height={254}
                                                alt="Picture of the author"
                                            />

                                            <div className="title">{post.name}</div>
                                            <Link  href={`/dashboard/detailPost/${post.post_id}`} style={{ textDecoration: 'underline', marginTop: '7px', fontSize: '15px', color: '#77cdff' }}>Xem chi tiết</Link>
                                            <div className="details flex flex-sb" style={{ marginTop: '7px' }}>
                                                <div className="author flex">
                                                    <img
                                                        src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                                        alt=""
                                                    />

                                                    <p>{post.fullname}</p>

                                                </div>
                                                <div className="price" style={{ fontSize: '10px' }}>{formatMoney(post.expect_price, 0) || 'Thương lượng'}</div> <hr />


                                            </div>

                                        </div>

                                    </div>




                                )
                            })}

                        </div>
                    </div>
                </div>

                {/* <!-- Section Right --> */}
                <div className="section-right" style={{ marginTop: '150px' }}>
                    {/* <div className="graph flex-c">
                            <p>Balance</p>
                            <h2>93,565.00</h2>

                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/graph.svg"
                                alt=""
                            />
                        </div> */}

                    <div className="top-creators">
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
        </>
    )
}