import React from 'react';
import { format } from 'date-fns'
import { Button, Form, FormGroup, Label, Input, Spinner, PaginationItem, PaginationLink, Pagination, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Axios from '@/helper/axios.helper'

import axios from 'axios'


export default function Blog({ userData }) {
    const [posts, setPosts] = useState([])
    const [pposts, setPPosts] = useState([])
    const [modal, setModal] = useState(false);
    const { fullname, name, email, accessApp, id } = userData
    const toggle = () => setModal(!modal);
    const [createRequest, setcreateRequest] = useState({
        post_id: null,
        user_id: id,
        expect_price: null,
        comments: null,
        status: 'approve'
    })
    const refesh = () => {
        axios.get('/api/post').then((response) => {
            const { data } = response.data
            console.log(data)
            setPosts(data)
        })
    }
    const [sendmail, setsendMail] = useState({
        to: null,
        subject: null,
        text: "Xin chao ban",
        html: "<h2> Chao xin</h2>"
    })

    const handlecreateRequest = (post_id) => {
        createRequest.post_id = post_id
        axios.post('/api/request', { ...createRequest }).then((response) => {
            setModal(!modal);
            // sendMail({ from, to, subject, text, html })
        }).then((response) => {
            axios.post('/api/mail', {...sendmail})
        })
    }
    const popularpost = () => {
        axios.get('/api/post?limit=3').then((response) => {
            const { data } = response.data
            console.log('popularpost', data)
            setPPosts(data)
        })
    }
    useEffect(() => {
        refesh()
        popularpost()
    }, [])
    useEffect(() => {

    }, [pposts])

    return (
        <>
            <div className="header-post">
                <h2>Posts</h2>
            </div>

            <div className="row-post">
                <div className="leftcolumn-post">
                    {posts ? posts.map((post, index) => {
                        console.log('hhehe', post)
                        return (
                            <>
                                <div className="card-post" key={index} >
                                    <h2>{post.name}</h2>
                                    <h5>{format(new Date(post.createAt), 'dd-MM-yyyy pp')} <span> By  {post.fullname}</span></h5>


                                    <Image
                                        loader={() => { return post.image || "https://via.placeholder.com/100x100" }}
                                        src="https://via.placeholder.com/100x100"
                                        width={400}
                                        height={200}
                                        alt="Picture of the author"
                                        style={{ textAlign: 'center' }}
                                    />


                                    <p>{post.content}</p>
                                    <Button onClick={toggle} color="primary" style={{ fontSize: '15px' }}>Ra giá</Button>

                                    <Modal isOpen={modal} toggle={toggle} >
                                        <ModalHeader toggle={toggle} style={{ textAlign: 'center', fontSize: '12px' }}>   Ra giá</ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label for="exampleText">
                                                        Gía mà bạn nghĩ nó sẽ phù hợp với món đồ
                                                    </Label>
                                                    <Input
                                                        id="exampleText"
                                                        name="text"
                                                        type="textarea"
                                                        onChange={(e) => {
                                                            setcreateRequest({
                                                                ...createRequest,
                                                                expect_price: e.target.value
                                                            })
                                                        }
                                                        }
                                                    />
                                                    <Label for="exampleText">
                                                        Lí do (Nếu có thể)
                                                    </Label>
                                                    <Input
                                                        id="exampleText"
                                                        name="text"
                                                        type="textarea"
                                                        onChange={(e) => {
                                                            setcreateRequest({
                                                                ...createRequest,
                                                                comments: e.target.value
                                                            })
                                                        }
                                                        }
                                                    />
                                                </FormGroup>
                                            </Form>


                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={(e) => { handlecreateRequest(post.post_id) }} style={{ fontSize: '15px' }}>
                                                Send
                                            </Button>

                                            <Button color="secondary" onClick={toggle} style={{ fontSize: '15px' }}>
                                                Cancel
                                            </Button>

                                        </ModalFooter>

                                    </Modal>
                                </div>
                            </>
                        )

                    }) : 'Loading....'}




                </div>
                <div className="rightcolumn-post">
                    <div className="card-post">
                        <h2>About Me</h2>
                        <div className="fakeimg" style={{ height: '100px' }}>Image</div>
                        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                    </div>
                    <div className="card-post">
                        <h3>Popular Post</h3>
                        {pposts ? pposts.map((ppost, index) => {
                            return (

                                <div key={index}>

                                    <Image
                                        loader={() => { return ppost.image || "https://via.placeholder.com/100x100" }}
                                        src="https://via.placeholder.com/100x100"
                                        width={150}
                                        height={86}
                                        alt="Picture of the author"
                                        style={{ textAlign: 'center' }}
                                    />
                                    <p>{ppost.name}</p>


                                </div>



                            )
                        }) : '..Loading'}

                    </div>

                </div>
            </div>


            <div className="footer-blog">
                <p style={{ marginTop: '10px', marginBottom: '-20px' }}>Author: {fullname}</p><br></br>
                <a style={{ marginBottom: '10px' }} href="mailto:hege@example.com">{email}</a>
            </div>

        </>
    )
}