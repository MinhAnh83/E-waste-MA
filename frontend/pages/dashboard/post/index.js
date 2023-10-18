
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
import Saler from '@/components/Saler.home';
import Blog from '@/components/Blog';


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


export default function Post({ userData }) {
    const { fullname, name, email, accessApp } = userData;
    //name la ten cua role
    const [layoutPages, setLayoutPages] = useState([])

    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });
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
    }, [])

    const handelLogout = () => {
        setCookie('vechaitoken', '')
        window.location.reload()

    }
    return (
        <> <Head>
            <title>Post</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/assets/img/logo1.PNG" />
        </Head>
            <main>
                <Layout pages={layoutPages} user={{ fullname, email, name }}>
                   <div style={{marginTop: '30px'}}>

                   </div>
                   <Blog />
                   
                    
                </Layout>
                {/* <!-- ======Section======= --> */}

                {/* <!-- ======End Section======= --> */}

                {/* <!-- End Dashboard --> */}
            </main>
            <Script src="/js/dashboard.js"></Script>
        </>
    )
}