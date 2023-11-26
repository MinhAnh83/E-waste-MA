import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { uploadFileToStorage } from '@/helper/firebase.helper'
import axios from 'axios';
import Axios from '@/helper/axios.helper'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout';
import UploadComponent from '@/components/uploadFile'
import { faCoffee, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { NextResponse } from 'next/server'
import { pages } from '@/utils/contanst'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import { ideahub_v1alpha } from 'googleapis';
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
    const { fullname, name, email, accessApp, id, image } = userData;
    const [Mypost, setMypost] = useState([])
    const [modal, setModal] = useState(false);
    const [files, setFiles] = useState(null)
    const [selectedPost, setSelectedPost] = useState([])

    const [updatePost, setupdatePost] = useState({
        name: null,
        user_id: id,
        image: null,
        content: null,
        expect_price: null,
        post_id: null
    })
    const toggle = (post) => { 
        setModal(!modal);
        console.log(post)
        setSelectedPost(post)
        
       
    }
    //name la ten cua role
    const handledUploadFile = (file) => {
        //file nay lay tu fileinput cua uplaod file su khi callback
        setFiles(file.files[0])
    }
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
    const handleUpdatePost = (post_id, image) => {
        console.log(1)
        if(!files) {
            selectedPost.image = image
            selectedPost.post_id = post_id
            selectedPost.user_id=id
            axios.post('/api/updatepost', { ...selectedPost }).then(() => {
                window.location.replace('/dashboard/myposts')

            })
            
        }
        uploadFileToStorage(files).then((imgURL) => {
            console.log(2)
            selectedPost.image = imgURL
            console.log(3)
            selectedPost.post_id = post_id
            selectedPost.user_id=id
            axios.post('/api/updatepost', { ...selectedPost }).then(() => {
                window.location.replace('/dashboard/myposts')

            })


        }).catch(() => {

        })
    }
    const handleMovetoTrash = (id) => {
        axios.post(`/api/movetotrash?post_id=${id}`).then((reponse) => {
            window.location.replace('/dashboard/myposts')
        })
    }
    const handleOutTrash = (id) => {
        axios.post(`/api/outtrash?post_id=${id}`).then((reponse) => {

            window.location.replace('/dashboard/myposts')
        })
    }
    const MyPostft = () => {
        axios.get(`/api/mypost?userid=${id}`).then((response) => {
            const { data } = response
            console.log('heelo', data)
            if (!data && !data.data) return
            const posts = data.data;
            setMypost(posts)

        }).catch((err) => {

        })
    }

    const handleDeleteAt = (id) => {
        axios.post(`/api/deletepost?post_id=${id}`).then((response) => {
            window.location.replace('/dashboard/myposts')
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
            <Layout pages={layoutPages} user={{ fullname, email, name, image }}>
                <div className="nfts">
                    <div className="trending heading flex flex-sb " style={{ marginTop: "20px" }}>
                        <h2>Quản lí bài đăng</h2>
                    </div>

                    {/* <!-- =====Browse NFT===== --> */}
                    <div className="browse">

                        {Mypost ? Mypost?.map((post, index) => {
                            return (

                                <>
                                    {post && post.is_deleted === 0 ?
                                        <div className="nft" key={index}>

                                            <Image
                                                loader={() => { return post.image || "https://via.placeholder.com/100x100" }}
                                                src="https://via.placeholder.com/100x100"
                                                width={268}
                                                height={254}
                                                alt="Picture of the author"
                                            />

                                            <div className="title">{post.name}</div>
                                            <button className="profile_button_fix" style={{ marginRight: "20px", borderRadius: "10px",fontSize: "14px",padding: "10px" }} onClick={() => {toggle(post)}}>Sửa bài viết</button>
                                            <button className="profile_button_fix" style={{  borderRadius: "10px",fontSize: "14px",padding: "10px" }} onClick={(e) => handleMovetoTrash(post.post_id)}>Di chuyển tới thùng rác </button>

                                        </div>
                                        : null}
                                </>








                            )
                        }) : <p>Không có bài đăng</p>}

                        <Modal isOpen={modal} toggle={toggle} >
                            <ModalHeader toggle={toggle}>Bài đăng</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup row>
                                        <Label for="namepost" sm={4}>
                                            Tiêu đề
                                        </Label>
                                        <Col sm={8}>
                                            <Input
                                                id="namepost"


                                                type="text"
                                                value={selectedPost.name}
                                                onChange={(e) => {
                                                    setSelectedPost({
                                                        ...selectedPost,
                                                        name: e.target.value
                                                    })
                                                   
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="pricepost" sm={4}>
                                            Giá muốn bán
                                        </Label>
                                        <Col sm={8}>
                                            <Input
                                                id="pricepost"


                                                type="number"
                                                value={selectedPost.expect_price}
                                                onChange={(e) => {
                                                    setSelectedPost({
                                                        ...selectedPost,
                                                        expect_price: parseFloat(e.target.value)
                                                    })
                                                    

                                                }}

                                            />
                                        </Col>

                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for="exampleText"
                                            sm={4}
                                        >
                                            Nội dung
                                        </Label>
                                        <Col sm={8}>
                                            <Input
                                                id="exampleText"
                                                name="text"
                                                type="textarea" 
                                                value={selectedPost.content}
                                                onChange={(e) => {
                                                    setSelectedPost({
                                                        ...selectedPost,
                                                        content: e.target.value
                                                    })
                                           
                                                }}
                                            />
                                        </Col>


                                    </FormGroup>

                                    <FormGroup row>
                                        <Label
                                            for="exampleText"
                                            sm={4}
                                        >
                                            Ảnh vật phẩm
                                        </Label>
                                        <Col sm={8}>
                                            <Input
                                                id="image"
                                                name="text"
                                                type="file"

                                                onChange={(e) => {

                                                    setFiles(e.target.files[0])
                                                    console.log(e.target.files[0])

                                                }}
                                            />
                                        </Col>


                                    </FormGroup>
                                </Form>

                                <hr></hr>

                                <Button style={{  borderRadius: "10px",fontSize: "14px",padding: "10px" }} onClick={() => {
                                    handleUpdatePost(selectedPost.post_id , selectedPost.image)
                                }}> Cập nhật bài viết</Button>
                                <Button style={{  borderRadius: "10px",fontSize: "14px",padding: "10px" }}
                                > Hủy </Button>
                            </ModalBody>

                        </Modal>





                    </div>
                </div>

                <div className="nfts">
                    <div className="trending heading flex flex-sb " style={{ marginTop: "20px" }}>
                        <h2>Thùng rác  </h2>
                    </div>

                    {/* <!-- =====Browse NFT===== --> */}
                    <div className="browse">

                        {Mypost ? Mypost?.map((post, index) => {
                            return (

                                <>
                                    {post && post.is_deleted === 1 ?
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
                                                <button style={{  borderRadius: "10px",fontSize: "14px",padding: "10px" }} className="profile_button_fix" onClick={(e) => handleDeleteAt(post.post_id)}>Xóa </button>
                                                <button className="profile_button_fix" onClick={(e) => handleOutTrash(post.post_id)} style={{ marginLeft:"10px", borderRadius: "10px",fontSize: "14px",padding: "10px" }}>Khôi phục bài đăng</button>
                                            </div>
                                        </div>

                                        : null}
                                </>





                            )
                        }) : <p>Thùng rác trống</p>}




                    </div>
                </div>
            </Layout>
            {/* modal updatePost */}


            {/* <!-- ======Section======= --> */}

            {/* <!-- ======End Section======= --> */}

            {/* <!-- End Dashboard --> */}
        </main>
        <Script src="/js/dashboard.js"></Script>
    </>

}


