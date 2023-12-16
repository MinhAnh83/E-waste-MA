import React from 'react';
// import { format } from 'date-fns'
import Link from 'next/link';
import { format } from "date-fns";

// import moment from "moment";
import {
    Button, Row, Col, Form, FormGroup, Label, Input,
    Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardText, CardSubtitle
} from 'reactstrap';
import { useState, useEffect } from 'react';
import Image from 'next/image'


import axios from 'axios'


export default function Blog({ userData }) {
    const [posts, setPosts] = useState([])
    const [pposts, setPPosts] = useState([])
    const [modal, setModal] = useState(false);
    const { fullname, name, email, accessApp, id } = userData
    const toggle = (post) => {
        setModal(!modal)
        setcreateRequest(post)
    }
    const [createRequest, setcreateRequest] = useState([])
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
        html: null
    })

    const handlecreateRequest = (post_id, user_id, expect_price, comment) => {
        console.log(11)
        createRequest.status = "approve"
        axios.post('/api/request', { ...createRequest }).then((response) => {

            // sendMail({ from, to, subject, text, html })
        }).then((response) => {
            console.log(22)
            axios.get(`/api/user?user_id=${user_id}`).then((response) => {
                const { data } = response.data;
                console.log('nguoi can gui mail', data)
                return data
            }).then((response) => {
                console.log('lay mail nha', response[0].email)
                sendmail.to = response[0].email
                sendmail.html = `<h3>Gía người ta ra: <span>${expect_price}</span> </h3>
                <h3>Comments:<span>${comment}</span> </h3>
                <a src="http://localhost:3000/dashboard/approve?user_id=${user_id}&&post_id=${post_id}">Chap nhan</a>
                `
                sendmail.subject = `Người mua ${id} ra giá sản phẩm ${post_id}`
                axios.post('/api/mail', { ...sendmail })
                setModal(!modal);
            })

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


    return (
        <>
            <div className="header-post">
                <h2>Các bài đăng</h2>
            </div>


            <div className="row-post">
                <div className="leftcolumn-post">
                    <Row >
                        {posts ? posts.map((post, index) => {
                            return (
                                <> {post && post.is_deleted === 0 ? <Col sm="5" style={{ marginTop: '10px' }}>
                                    <Card
                                        style={{
                                            width: '18rem', height: '22rem'
                                        }}
                                    >
                                        <Image
                                            loader={() => { return post.image || "https://via.placeholder.com/100x100" }}
                                            src="https://via.placeholder.com/100x100"
                                            alt="Picture of the author"
                                            width={286}
                                            height={200}
                                        />
                                        <CardBody>
                                            <CardTitle tag="h5" style={{ marginTop: '-5px' }}>
                                                {post.name}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                <span style={{color:'black'}}>Ngày đăng:</span>   {new Date(post.createAt).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: 'numeric'
                                                })} <br>
                                                </br>
                                                
                                              <span>{post.fullname}</span>   <br></br>


                                            </CardSubtitle>
                                            <CardText>
                                              
                                                <Link href={`/dashboard/detailPost/${post.post_id}`} style={{ textDecoration: 'underline', marginTop: '7px', fontSize: '15px', color: '#77cdff' }}>Xem chi tiết</Link> <br></br>
                                                {post.expect_price == 0 ? <button onClick={(e) => { toggle(post) }} className='button-price' color="primary" style={{ fontSize: '15px' }}>Ra giá</button> : null}

                                            </CardText>


                                        </CardBody>
                                    </Card>
                                </Col> : null}

                                </>
                            )
                        }) : 'Không có bài viết'}


                    </Row>





                </div>
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
                                <br></br>
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
                        <Button color="secondary" onClick={(e) => { handlecreateRequest(createRequest.post_id, createRequest.user_id, createRequest.expect_price, createRequest.comments) }} style={{ fontSize: '15px' }}>
                            Send
                        </Button>

                        <Button color="secondary" onClick={toggle} style={{ fontSize: '15px' }}>
                            Cancel
                        </Button>

                    </ModalFooter>

                </Modal>
                <div className="rightcolumn-post">
                    <div className="card-post">
                        <h3 style={{ color: 'rebeccapurple' }}>Lưu ý</h3>
                        {/* <div className="fakeimg" style={{ height: '100px' }}>Image</div> */}
                        <p>Đối với các bài đăng hay vật phẩm có gí trị lớn hoặc người dùng không biết định giá thì người mua phải ra giá. </p>
                    </div>
                    <div className="card-post">
                        <h6 style={{ color: 'black', fontWeight: '600' }}>Các bài đăng gần nhất</h6>
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


            <div className="footer-blog" style={{ marginTop: '20px' }}>
                <p style={{ marginTop: '10px', marginBottom: '-20px' }}>Author: {fullname}</p><br></br>
                <a style={{ marginBottom: '10px' }} href="mailto:hege@example.com">{email}</a>
            </div>

        </>
    )
}