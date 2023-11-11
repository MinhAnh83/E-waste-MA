import Link from 'next/link'
import Image from 'next/image'
import { Container, Row, Col } from 'reactstrap'
import styles from '@/styles/Footer.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


import { faFacebook, faTwitter,faInstagram ,faYoutube } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <Container fluid className={styles.footer}>
            <Row style={{ paddingBottom: '10px' }}>
                <Col >
                    <Image
                        src="/assets/img/logo.PNG"
                        width={86}
                        height={42}
                        alt="Picture of the author"
                    />
                </Col>
                <Col>
                    <h4>PAGE</h4>
                    <ul className={styles.linkGroup}>
                        <li>  <Link className={styles.linkFooter}  href="/login">Đăng nhập</Link></li>
                        <li><Link  className={styles.linkFooter}   href="/register">Đăng ký</Link></li>
                        <li>   <Link   className={styles.linkFooter}  href="/login">Về chúng tôi</Link></li>

                    </ul>
                  
                    
                   
                 
                </Col>
                <Col>
                    <h4>CONTACT LINKS</h4>
                 
             
                    <FontAwesomeIcon className={styles.iconbrand} icon={faFacebook} style={{padding:'10px',width: '40px',height:'40px'}} />
                    <FontAwesomeIcon className={styles.iconbrand} icon={faTwitter} style={{padding:'10px',width: '40px',height:'40px'}} />
                    <FontAwesomeIcon className={styles.iconbrand} icon={faYoutube} style={{padding:'10px',width: '40px',height:'40px'}} />
                    <FontAwesomeIcon className={styles.iconbrand} icon={faInstagram} style={{padding:'10px',width: '40px',height:'40px'}} />
                </Col>
            </Row>
            <Row style={{ borderTop: '1px solid black', textAlign: 'center' , }}>
                <p>Copyright by Anh</p>
            </Row>

        </Container>


    )

}
export default Footer