
import Image from 'next/image'
import Link from 'next/link'
import style from '@/styles/navbar/Navbar.module.css'

const Narvbarhome = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
        <Link  className={`nav-link ${style['nav-link-cus']}`} href="/">
        <Image
            src="/assets/img/logo.PNG"
            width={140}
            height={50}
            alt="Picture of the author"
            
        />
        </Link>
        
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            </ul>
            <span className="navbar-text">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className={`nav-link active ${style['nav-link-cus']}`} aria-current="page" href="#">Sản phẩm </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${style['nav-link-cus']}`}  href="#">Về chúng tôi</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${style['nav-link-cus']}`} href="#">Người dùng</a>
                </li>
                <li className="nav-item">
                <Link  className={`nav-link ${style['nav-link-cus']}`} href="/login">Đăng nhập</Link>
                </li>
                <li className="nav-item bg-primary">
                <Link  className={`nav-link ${style['nav-link-try']}`}  href="/register">Dùng thử</Link>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </nav>
    )

}
export default Narvbarhome