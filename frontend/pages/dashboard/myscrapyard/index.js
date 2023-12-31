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
import Updatescrapyard from '@/components/Updatescrapyard';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Label, Col, Input } from 'reactstrap';
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

export default function Myscrapyard({ userData }) {
  const { fullname, name, email, accessApp, id, image } = userData;
  console.log('Datacua user', userData)
  const [File, setFile] = useState(null)
  const [errMsg, setErrMsg] = useState(null)
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
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [deleteid, setDeleteid] = useState({});
  const [scrapyardSelected, setScrapyardSelected] = useState({});
  const toggle1 = (id) => {
    setModal1(!modal1)
    setDeleteid(id)
  }
  const toggle2 = (scrapyard) => {
    console.log('test:::', scrapyard)

    setScrapyardSelected(scrapyard)
    setModal2(!modal2)
  }
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
  const Movecenter = (index) => {
    <Map markerList={Myscrapyards} center={(() => {
      return Myscrapyards && Myscrapyards[index] && Myscrapyards[index].position
    })()} />
  }
  const handleUpdate = (id) => {

  }

  const handleDelete = (id) => {
    axios.post(`/api/myscrapyard/delete?scrapyard_id=${id}`)
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
          <h2 style={{ textAlign: "center", padding: "10px" }}>Quản lí vựa ve chai</h2>
          <Map markerList={Myscrapyards} center={(() => {
            return Myscrapyards && Myscrapyards[0] && Myscrapyards[0].position
          })()} />
          {/* IIFE giup chay lam luon khoi can goi */}
        </div>


        <div style={{ marginTop: '40px', position: 'relative' }}>
          <Link href="/dashboard/myscrapyard" onClick={toggle} >
            <FontAwesomeIcon icon={faPlus} style={{ width: '20px', height: '20px', marginBottom: '3px', marginRight: '10px' }} />
            Thêm vựa</Link>
          <Link href="/dashboard/myscrapyard" onClick={onRefresh} style={{
            marginRight: '10px', position: 'absolute',
            right: '0px'
          }}>
            <FontAwesomeIcon icon={faPlus} style={{ width: '20px', height: '20px', marginBottom: '3px' }} />
            Làm mới</Link>
        </div>

        <div className="table_scrapyard" style={{ marginTop: "20px" }}>
          <Table hover>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>
                  ID
                </th>
                <th>
                  Tên
                </th>
                <th>
                  Địa chỉ
                </th>
                <th>
                  Thời gian mở cửa
                </th>
                <th>
                  Hình ảnh
                </th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {Myscrapyards && Myscrapyards.map((myscrapyards, index) => {
                return (
                  <tr onClick={(index) => { Movecenter(index) }} key={index}>
                    <th scope="row">
                      {myscrapyards.scrapyard_id}
                    </th>
                    <td style={{ fontSize: "15px" }}>
                      {myscrapyards.name}
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      {myscrapyards.address}
                    </td>
                    <td style={{ fontSize: "14px" }}>
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
                    <td>
                      <button className='delete-button' onClick={(e) => { toggle1(myscrapyards.scrapyard_id) }}>Xóa</button>
                    </td>
                    <td>
                      <button className='cancel-button' onClick={(e) => { toggle2(myscrapyards) }}>Sửa</button>
                    </td>
                  </tr>
                )
              })}


            </tbody>
          </Table>
        </div>
      </Layout>
      <Modal isOpen={modal1} toggle1={toggle1} >
        <ModalHeader toggle1={toggle1}>Thông báo !!</ModalHeader>
        <ModalBody>
          Bạn có chắc chắn muốn xóa không vì khi xóa thì bạn sẽ không phục hồi được.
        </ModalBody>
        <ModalFooter>
          <button className='delete-button' style={{ background: '#ef9090' }} onClick={(e) => { handleDelete(deleteid) }}>
            Xóa
          </button>
          <button color="secondary" className='cancel-button' onClick={toggle1}>
            Thoát
          </button>
        </ModalFooter>
      </Modal>
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

    <Modal isOpen={modal2} toggle={toggle2}  style={{ top: '-30px'}}>
      <ModalHeader toggle={toggle2}>Sửa thông tin vựa</ModalHeader>
      <ModalBody>
        <Updatescrapyard scrapyardSelected={scrapyardSelected}></Updatescrapyard>
      </ModalBody>
      <ModalFooter>
       
        <button color="secondary" className='cancel-button' onClick={toggle2}>
          Thoát
        </button>
      </ModalFooter>
    </Modal>
    <Script src="/js/dashboard.js"></Script>
  </>

}


