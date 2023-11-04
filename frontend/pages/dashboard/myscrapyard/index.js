import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from '@/helper/axios.helper'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NextResponse } from 'next/server'
import { pages } from '@/utils/contanst'
import Createscrapyard from '@/components/Createscrapyard';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
//  import '@/styles/globals.css'
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
  const { fullname, name, email, accessApp, id , image} = userData;
  console.log('Datacua user',userData)
  const [Myscrapyards, setMyscrapyards] = useState([])
  //name la ten cua role
  const [layoutPages, setLayoutPages] = useState([])
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
    loading: () => <p>Loadingopl...</p>,
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
    onRefresh()

  }, [])

  const handelLogout = () => {
    setCookie('vechaitoken', '')
    window.location.reload()

  }
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onRefresh = () => {
    axios.get(`/api/myscrapyard?id=${id}`).then((response) => {
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
      setMyscrapyards(data)
    })
  }
const Movecenter=(index)=> {
<Map markerList={Myscrapyards} center={(() => {
            return Myscrapyards && Myscrapyards[index] && Myscrapyards[index].position
          })()}/>
}


  return <>
    <Head>
      <title>Quản lí vựa</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/assets/img/logo1.PNG" />
    </Head>
    <main>
      <Layout pages={layoutPages} user={{ fullname, email, name, image }} >
        <div className="heading" style={{ marginTop: 20 }}>
          <h2>Quản lí vựa ve chai</h2>
          <Map markerList={Myscrapyards} center={(() => {
            return Myscrapyards && Myscrapyards[0] && Myscrapyards[0].position
          })()}/>
          {/* IIFE giup chay lam luon khoi can goi */}
        </div>


        <div style={{ marginTop: '40px', position:'relative' }}>
          <Link href="/dashboard/myscrapyard" onClick={toggle} >
            <FontAwesomeIcon icon={faPlus} style={{ width: '20px', height: '20px', marginBottom: '3px', marginRight: '10px' }} />
            Thêm vựa</Link>
          <Link href="/dashboard/myscrapyard" onClick={onRefresh} style={{marginRight: '10px', position: 'absolute',
    right: '0px'}}>
            <FontAwesomeIcon icon={faPlus} style={{ width: '20px', height: '20px', marginBottom: '3px' }} />
            Lam moi</Link>
        </div>

        <div className="table_scrapyard" style={{ marginTop: "20px" }}>
          <Table hover>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>
                  ID
                </th>
                <th>
                  Name
                </th>
                <th>
                  Address
                </th>
                <th>
                  Open time
                </th>
                <th>
                  Image
                </th>
              </tr>
            </thead>
            <tbody>
              {Myscrapyards && Myscrapyards.map((myscrapyards, index) => {
                return (
                  <tr onClick={(index)=>{Movecenter(index)}} key={index}>
                    <th scope="row">
                      {myscrapyards.scrapyard_id}
                    </th>
                    <td>
                      {myscrapyards.name}
                    </td>
                    <td>
                      {myscrapyards.address}
                    </td>
                    <td>
                      {myscrapyards.open_time}
                    </td>
                    <td>
                      <Image
                        loader={() => { return myscrapyards.image || "https://via.placeholder.com/100x100" }}
                        src="https://via.placeholder.com/100x100"
                        width={100}
                        height={100}
                        alt="Picture of the author"
                        style={{ textAlign: 'center' }}
                      />


                    </td>
                  </tr>
                )
              })}


            </tbody>
          </Table>
        </div>
      </Layout>

      {/* <!-- ======Section======= --> */}

      {/* <!-- ======End Section======= --> */}

      {/* <!-- End Dashboard --> */}
    </main>
    <Modal isOpen={modal} toggle={toggle} fullscreen>
      <ModalHeader toggle={toggle}>Thêm thông tin vựa</ModalHeader>
      <ModalBody>
        <Createscrapyard userData={userData}></Createscrapyard>
      </ModalBody>

    </Modal>
    <Script src="/js/dashboard.js"></Script>
  </>

}


