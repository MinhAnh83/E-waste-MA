import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faNewspaper, faMagnifyingGlassLocation, faStore ,faCircleUser, faMessage} from '@fortawesome/free-solid-svg-icons'
export const pages = [
    {
        key: "dashboard",
        name: "Trang chủ",
        icon: <FontAwesomeIcon icon={faShop} style={{ width: '20px', height: '20px',  marginBottom: '12px' }} />,
        href: '/dashboard'

    },
    {
        key: "posts",
        name: "Các bài đăng",
        icon: <FontAwesomeIcon icon={faNewspaper} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/post'

    },
    {
        key: "findbuyer",
        name: "Tìm người thu mua",
        icon: <FontAwesomeIcon icon={faMagnifyingGlassLocation} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/findbuyer'
        

    },
    {
        key: "findscrapyard",
        name: "Tìm vựa ve chai",
        icon: <FontAwesomeIcon icon={faStore} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/saleplaces'
        

    },
    {
        key: "myposts",
        name: "Quản lí bài đăng",
        icon: <FontAwesomeIcon icon={faCircleUser} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/myposts'
        

    },
    {
        key: "myscrapyard",
        name: "Quản lí vựa",
        icon: <FontAwesomeIcon icon={faCircleUser} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/myscrapyard'
        

    },
    {
        key: "chatbox",
        name: "Trò chuyện",
        icon: <FontAwesomeIcon icon={faMessage} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/chatbox'
    }
]