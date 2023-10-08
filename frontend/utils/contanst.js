import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
export const pages=[
    {
        key: "dashboard",
        name: "Trang chu",
        icon: <FontAwesomeIcon icon={faSun} style={{  width: '20px', height: '20px' }} />,
        href: '/'

    },
        {
            key: "Posts",
            name: "Bai viet ",
            icon: <FontAwesomeIcon icon={faSun} style={{  width: '20px', height: '20px' }} />,
            href: '/dashboard/post'

        }
]