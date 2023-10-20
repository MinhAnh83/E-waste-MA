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

// import '@/styles/globals.css'
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

export default function Myposts({ userData }) {
    const { fullname, name, email, accessApp, id } = userData;
    const [Mypost, setMypost] = useState([])
    //name la ten cua role
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
             MyPostft()
        }

    }, [])

    const handelLogout = () => {
        setCookie('vechaitoken', '')
        window.location.reload()

    }

    const MyPostft = () => {
        axios.get(`/api/mypost?userid=2`).then((response) => {
            const { data } = response
            console.log('heelo', data)
            setMypost(data[0])

        }).catch((err) => {

        })
    }
   

    return <>
        <Head>
            <title>Quản lí bài đăng</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/assets/img/logo1.PNG" />
        </Head>
        <main>
            <Layout pages={layoutPages} user={{ fullname, email, name }}>
                <div className="nfts">
                    <div className="trending heading flex flex-sb " style={{ marginTop: "20px" }}>
                        <h2>Some Posts</h2>
                    </div>

                    {/* <!-- =====Browse NFT===== --> */}
                    <div className="browse">

                        {Mypost ? Mypost?.map((post, index) => {
                            return (

                                <div className="nft" key={index}>

                                    <div >
                                        <Image
                                            loader={() => { return post.image || "https://via.placeholder.com/100x100" }}
                                            src="https://via.placeholder.com/100x100"
                                            width={268}
                                            height={254}
                                            alt="Picture of the author"
                                        />

                                        <div className="title">{post.name}</div>
                                        <Button>Fix</Button>
                                    </div>

                                </div>




                            )
                        }) : <p>Không có bài đăng</p>}




                    </div>
                </div>
            </Layout>

            {/* <!-- ======Section======= --> */}

            {/* <!-- ======End Section======= --> */}

            {/* <!-- End Dashboard --> */}
        </main>
        <Script src="/js/dashboard.js"></Script>
    </>

}


