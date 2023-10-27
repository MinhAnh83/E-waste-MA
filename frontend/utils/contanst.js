import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faNewspaper, faMagnifyingGlassLocation, faStore ,faCircleUser} from '@fortawesome/free-solid-svg-icons'
export const pages = [
    {
        key: "dashboard",
        name: "Home page",
        icon: <FontAwesomeIcon icon={faShop} style={{ width: '20px', height: '20px',  marginBottom: '12px' }} />,
        href: '/dashboard'

    },
    {
        key: "posts",
        name: "Blog",
        icon: <FontAwesomeIcon icon={faNewspaper} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/post'

    },
    {
        key: "findbuyer",
        name: "Find Buyers",
        icon: <FontAwesomeIcon icon={faMagnifyingGlassLocation} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/findbuyer'
        

    },
    {
        key: "findscrapyard",
        name: "Find Buyers",
        icon: <FontAwesomeIcon icon={faStore} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/saleplaces'
        

    },
    {
        key: "myposts",
        name: "Manage posts",
        icon: <FontAwesomeIcon icon={faCircleUser} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/myposts'
        

    },
    {
        key: "myscrapyard",
        name: "Manage scrap yard",
        icon: <FontAwesomeIcon icon={faCircleUser} style={{ width: '20px', height: '20px',   marginBottom: '12px' }} />,
        href: '/dashboard/myscrapyard'
        

    }
]