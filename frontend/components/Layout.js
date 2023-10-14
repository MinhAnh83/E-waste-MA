

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'

export default function Layout({ pages = [], user = {}, children }) {

    const [navs, setNavs] = useState(pages)
    useEffect(() => {
        setNavs(pages)
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

                        {navs.map((nav, index) => {
                            return (

                                <div className="menu-item flex " key={index}>
                                    <Link href={nav.href}>
                                        <div className="icon">
                                            {nav.icon}
                                            <p style={{ fontSize: '20px' }}>{nav.name}</p>
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

                            <p>Logout</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-content">
                    <div className="topbar flex flex-sb">
                        <div className="search flex">
                            <div className="icon">
                                <ion-icon name="search-outline"></ion-icon>
                            </div>
                            <input type="text" placeholder=" Search any collection" />
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

                        <div className="user flex flex-sb">
                            <img
                                src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                alt=""
                            />
                            <p>{user.fullname}</p>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </div>
                    </div>

                    {children}
                </div>
            </div>


        </>
    )
}