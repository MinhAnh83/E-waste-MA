import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/login/index.module.css'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Axios from '@/helper/axios.helper'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbarhome from '@/components/Navbarhome'
import React, { useState } from "react";
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
  Nav,
  Spinner
} from "reactstrap";
const inter = Inter({ subsets: ['latin'] })
//dung getStaticProps goi duoc cong 8000
export async function getStaticProps() {
  const res = await Axios.get('/api/product')
console.log(res)
  return {
    props: {
      data: {}
    },
  };
}

export default function Home({ data }) {
  const [customer, setCustomer] = useState({
    email: '',
    password: ''
  })
  const [spinner, setSpinner] = useState(false)
  const handle = () => {
    window.alert('test nè')
  }
  const onHandleLogin = (e) => {
    e.preventDefault()
    //goi cong 3000
    Axios.post('/api/login/user', {
      ...customer

    }).then((response) => {
      console.log(response)
      //email, full name, password, token
      const { data } = response.data
      const results = response.data.data.result
      const email = results.email
      console.log(data)
       const { token } = data
       Axios.defaults.headers.common['authorization'] = token;
      localStorage.setItem('user', email)
      setCookie('vechaitoken',token,2)
      setSpinner(true)
       window.location.replace('/dashboard')
      // router.push('/dashboard')
      // navigate('/')
    }).catch((err) => {
      console.log(err)
    })
  }
  const setCookie=(cname, cvalue, exdays)=>{
    const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  // console.log('FrontEnd nè', data)
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
       <Navbarhome/>
        <h1>Đăng nhập</h1>
        <Container fluid>
          <Row>
            <Col style={{ marginTop: '76px', marginLeft: '20px', textAlign:'center' }}>
              <Image
                src="/assets/img/login3.png"
                width={500}
                height={400}
                alt="Picture of the author"
                style={{ marginTop: '10px' }}
              />

            </Col>
            <Col style={{ marginTop: '78px' }}>
              <Card className={styles.loginBlock} style={{ width: '400px', height: '472px' , padding:'30px'}}>
                <CardTitle tag="h4" style={{textAlign:'center'}}>
                <span className={styles.cardTitle}>Đăng nhập</span>  </CardTitle>
                <div className={styles.inputLogin}>
                  <label className={styles.labelLogin}>Email </label>

                  <Input
                    placeholder="Email"
                    type="email"
                    value={customer.email}
                    onChange={e => setCustomer({
                      ...customer,
                      email: e.target.value
                    })}
                  />
                </div>
                <div className={styles.inputLogin} style={{ marginTop: '10px' }}>
                  <label className={styles.labelLogin}>Password</label>
                  <Input
                    placeholder="Password"
                    type="password" style={{ color: "black" }}
                    value={customer.password}
                    onChange={e => setCustomer({
                      ...customer,
                      password: e.target.value
                    })}
                  />
                </div>
                <NavLink style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                  {/* <Link href="/"> Không có tài khoản? Hãy Đăng ký</Link> */}
                </NavLink>
                <Button className={styles.btnLogin}
                  size="lg"
                  onClick={onHandleLogin}>
                {(spinner)?<Spinner></Spinner> : 'Bắt đầu' }  
                  
                </Button>
              </Card>


            </Col>
          </Row>
        </Container>



        {/* <ul>
          {data.map((product) => {
            return(
              <li>
              <h3>{product.Name}</h3>
             
            </li>
            )
        
          })}
        </ul> */}
      </main>
    </>
  )
}
