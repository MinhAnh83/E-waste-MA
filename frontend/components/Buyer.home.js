import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from '@/helper/axios.helper'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout';
import { faCoffee, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { NextResponse } from 'next/server'
import { pages } from '@/utils/contanst'


export default function () {
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });
    return (
        <>
            <div className="heading" style={{ marginTop: 20 }}>
                <h2>MAP</h2>
                <Map />
            </div>

            <div className="section flex flex-sb" >
                <div className="section-left">
                    <div className="nfts">
                        <div className="trending heading flex flex-sb " style={{ marginTop: "20px" }}>
                            <h2>Some Posts</h2>
                        </div>

                        {/* <!-- =====Browse NFT===== --> */}
                        <div className="browse">
                            <div className="nft">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/nft-1.jpg"
                                    alt=""
                                />
                                <div className="title">Weary Artwork</div>
                                <div className="details flex flex-sb">
                                    <div className="author flex">
                                        <img
                                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                            alt=""
                                        />
                                        <p>Hassnain Haider</p>
                                    </div>
                                    <div className="price">4.5 ETH</div>
                                </div>
                            </div>

                            <div className="nft">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/nft-2.jpg"
                                    alt=""
                                />
                                <div className="title">Spectrum of Color</div>
                                <div className="details flex flex-sb">
                                    <div className="author flex">
                                        <img
                                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                            alt=""
                                        />
                                        <p>Hassnain Haider</p>
                                    </div>
                                    <div className="price">4 ETH</div>
                                </div>
                            </div>

                            <div className="nft">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/nft-3.jpg"
                                    alt=""
                                />
                                <div className="title">Vivid Artwork</div>
                                <div className="details flex flex-sb">
                                    <div className="author flex">
                                        <img
                                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                            alt=""
                                        />
                                        <p>Hassnain Haider</p>
                                    </div>
                                    <div className="price">3.5 ETH</div>
                                </div>
                            </div>

                            <div className="nft">
                                <img
                                    src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/nft-4.jpg"
                                    alt=""
                                />
                                <div className="title">Nature's Love</div>
                                <div className="details flex flex-sb">
                                    <div className="author flex">
                                        <img
                                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                            alt=""
                                        />
                                        <p>Hassnain Haider</p>
                                    </div>
                                    <div className="price">5 ETH</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Section Right --> */}
                <div className="section-right">
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