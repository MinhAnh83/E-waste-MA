

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function Layout({ pages = [], user = {}, children }) {
    const [modal, setModal] = useState(false);
    const [navs, setNavs] = useState(pages)
    const toggle = () => setModal(!modal);
    console.log('hello', user)

    useEffect(() => {
        setNavs(pages)
        console.log(navs)
    }, [pages])
    const handelLogout = () => {
        setCookie('vechaitoken', '')
        window.location.reload()

    }

    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }


    return (
        <>
            <div className="dashboard">

                <div className="sidebar flex-c flex-sb">
                    <div className="brand">E-Waste  <p style={{ fontSize: '10px' }}>{user.name}</p> </div>


                    <div className="side-nav">

                        {navs && navs.map((nav, index) => {
                            return (

                                <div className="menu-item flex " key={index}>
                                    <Link href={nav.href}>
                                        <div className="icon">
                                            {nav.icon}
                                            <p style={{ fontSize: '17px' }}>{nav.name}</p>
                                        </div>

                                    </Link>

                                </div>

                            )
                        })}

                    </div>
                    <div className="log-out">
                        <div className="menu-item flex" onClick={handelLogout}>
                            <div className="icon">
                                <ion-icon name="log-out-outline"></ion-icon>
                            </div>

                            <p>Đăng xuất</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-content">
                    <div className="topbar flex flex-sb">
                        <div className="search flex">
                            <div className="icon">
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <input type="text" placeholder=" Tìm kiếm " />
                        </div>

                        <div className="theme flex">
                            <div className="dark flex">
                                {/* <BsFillMoonStarsFill/> */}
                                <FontAwesomeIcon icon={faMoon} style={{ padding: '10px', width: '40px', height: '40px' }} />
                            </div>
                            <div className="light active flex">
                                {/* <BsSun/> */}
                                <FontAwesomeIcon icon={faSun} style={{ padding: '10px', width: '40px', height: '40px' }} />
                            </div>
                        </div>

                        <div className="notification icon">
                            {/* <BsFillBellFill/> */}
                        </div>

                        <div className="user flex flex-sb" onClick={toggle}>
                            <Image
                              loader={() => { return user.image || "https://via.placeholder.com/100x100" }}
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                                width={24}
                                height={20}
                                style={{borderRadius:'50%', border:'1px solid gray'}}
                            />
                            <p>{user.fullname}</p>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>
                    </div>

                    {children}
                </div>
            </div>

            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Profile</ModalHeader>
                <ModalBody>
                    <h4>Xin chào {user.fullname} !</h4>
                    <p>Email: {user.email}</p>

                </ModalBody>
                <ModalFooter>

                    <Link href='/dashboard/profile'>
                        <div className="profile_button_fix" >
                          
                            <p style={{ fontSize: '20px', marginTop: '10px', fontSize: "14px"}}>Sửa profile</p>
                        </div>
                    </Link>
                </ModalFooter>
            </Modal>


        </>
    )
}