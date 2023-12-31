import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/login/index.module.css'
import Script from 'next/script'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbarhome from '@/components/Navbarhome'
import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    ListGroupItem,
    ListGroup,
    Container,
    Row,
    Col,
    CardImg,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Navbar,
    NavItem,
    NavLink,
    Nav
} from "reactstrap";
const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
    // axios.get('/api/product').then(res => {

    //     const { data } = res.data;
    //     // data nay la dat tren shopcontroller
    //     console.log(data)

    // })
    return {
        props: {
            data: {}
        },
    };
}


export default function Home({ data }) {
    const [customer, setCustomer] = useState({})
    const [roles, setRoles] = useState([])
    const handle = () => {
        window.alert('test nè')
    }
    useEffect(() => {
        axios.get('/api/role').then((response) => {
            const { data } = response
            console.log(data)
            setRoles(data.data)

        })
        return () => {
           
        }
    }, [])
    const onHandleSignup = (e) => {
        e.preventDefault()
        axios.post('/api/signup', {
            ...customer

        }).then((response) => {
            console.log(response)

            window.location.replace('/login')
        })
    }
    // console.log('FrontEnd nè', data)
    return (
        <>
            <Head>
                <title>Sign up</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script src="https://example.com/script.js" />
            <main className={`${styles.main} ${inter.className}`}>
                <Navbarhome />
                <h1> </h1>
                <section style={{ marginTop: '80px', marginBottom: '30px', padding: '-40px' }}>
                    <div className="container h-50">
                        <div className="row d-flex justify-content-center align-items-center h-50" style={{ marginTop: '10px' }}>
                            <div className="col-lg-12 col-xl-11">
                                <div className="card text-black" style={{ borderRadius: '25px' }} >
                                    <div className="card-body p-md-1">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"><span className={styles.cardTitleR}>Đăng ký</span></p>

                                                <form className="mx-1 mx-md-4">
                                                    <Row>
                                                        <Col>
                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <label className={styles.labelLogin} for="form3Example1c">Full Name</label>
                                                                    <input type="text" id="form3Example1c" className="form-control" value={customer.fullname}
                                                                        onChange={e => setCustomer({
                                                                            ...customer,
                                                                            fullname: e.target.value
                                                                        })} />

                                                                </div>
                                                            </div>

                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <label className={styles.labelLogin} for="form3Example3c"> Email</label>
                                                                    <input type="email" id="form3Example3c" className="form-control" value={customer.email}
                                                                        onChange={e => setCustomer({
                                                                            ...customer,
                                                                            email: e.target.value
                                                                        })} />

                                                                </div>
                                                            </div>

                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <label className={styles.labelLogin} for="form3Example4c">Password</label>
                                                                    <input type="password" id="form3Example4c" className="form-control"
                                                                        value={customer.password}
                                                                        onChange={e => setCustomer({
                                                                            ...customer,
                                                                            password: e.target.value
                                                                        })} />

                                                                </div>
                                                            </div>

                                                    
                                                        </Col>
                                                        <Col>
                                                            <div class="col-md-6 mb-4" style={{ marginBottom: '10px' }}>
                                                                <label className={styles.labelLogin} for="form3Example4cd" style={{ paddingBottom: '5px', marginLeft: '14px' }}>Vai trò</label>
                                                                {/* <select className="select" style={{ marginLeft: '10px',padding: '8px' }} onChange={(e)=>{}}>
                                                                    {roles.map((role,index)=>{
                                                                        return (
                                                                            <option value={role.role_id}>{role.name}</option>
                                                                        )
                                                                    })}
                                                                  
                                                                    <option value="2">Người bán</option>
                                                                    <option value="3">Chủ vựa</option>

                                                                </select> */}
                                                                {
                                                                    (roles.length > 0) ? (
                                                                        <select name="user" id="user"
                                                                            onChange={(e) => setCustomer({
                                                                                ...customer,
                                                                                role_id: e.target.value ? parseInt(e.target.value) : e.target.value
                                                                            })}
                                                                            style={{ border: '1px solid #dee2e6a3', width: '150px', height: '36px', borderRadius: '6px', color: 'GrayText' }}>
                                                                            <option value=''>-Chọn Vai Trò-</option>
                                                                            {
                                                                                roles.map((role, index) => {
                                                                                    return <option key={index} value={role.role_id}>{role.name}</option>
                                                                                })
                                                                            }
                                                                        </select>
                                                                    ) : 'Loading...'
                                                                }

                                                            </div>

                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0" style={{ marginTop: '5px' }} >
                                                                    <label className={styles.labelLogin} for="form3Example1c" style={{ paddingBottom: '5px' }}>Address</label>
                                                                    <input type="text" id="form3Example1c" className="form-control" value={customer.address}
                                                                        onChange={e => setCustomer({
                                                                            ...customer,
                                                                            address: e.target.value
                                                                        })} />

                                                                </div>
                                                            </div>

                                                            <div className="d-flex flex-row align-items-center mb-4" >
                                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0" style={{ marginTop: '5px' }}>
                                                                    <label className={styles.labelLogin} for="form3Example1c" style={{ paddingBottom: '5px' }}>Telephone</label>
                                                                    <input type="text" id="form3Example1c" className="form-control" value={customer.telephone}
                                                                        onChange={e => setCustomer({
                                                                            ...customer,
                                                                            phonenumber: e.target.value
                                                                        })} />

                                                                </div>
                                                            </div>

                                                        </Col>
                                                    </Row>

                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label className={styles.labelLogin} for="form3Example4cd">Repeat your password</label>
                                                            <input type="password" id="form3Example4cd" className="form-control"
                                                                value={customer.password}
                                                                onChange={e => setCustomer({
                                                                    ...customer,
                                                                    password: e.target.value
                                                                })} />

                                                        </div>
                                                    </div>


                                                    <div className="form-check d-flex justify-content-center mb-5">
                                                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                        <label class="form-check-label" for="form2Example3">
                                                            I agree all statements in <a href="#!">Terms of service</a>
                                                        </label>
                                                    </div>

                                                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <button type="button" className={styles.btnRegister} onClick={onHandleSignup}>Register</button>
                                                    </div>

                                                </form>

                                            </div>

                                            <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                                <Image
                                                    src="/assets/img/register.png"
                                                    width={460}
                                                    height={300}
                                                    alt="Picture of the author"

                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>






            </main>
        </>
    )
}
