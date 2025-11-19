import {
  LucideDollarSign,
  LucideFileText,
  LucideHeart,
  LucideHome,
  LucideSquarePen,
  LucideUserRoundCheck,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import styles from './SideNavigation.module.scss'
import { useUser } from '@/stores/userContext'
import { ROUTE_PATHS } from '@/constants/route'

const USER_SIDE_MENU = [
  {
    label: '주문 내역',
    path: ROUTE_PATHS.MYPAGE.ORDER_LIST,
    icon: <LucideDollarSign />,
  },
  { label: '찜한 상품', path: ROUTE_PATHS.MYPAGE.WISH_LIST, icon: <LucideHeart /> },
  { label: '상품 후기', path: ROUTE_PATHS.MYPAGE.REVIEWS, icon: <LucideSquarePen /> },
  { label: '회원정보 관리', path: ROUTE_PATHS.MYPAGE.INFORMATION, icon: <LucideUserRoundCheck /> },
]

const SELLER_SIDE_MENU = [
  { label: '메인', path: '', icon: <LucideHome /> },
  { label: '상품 등록', path: '', icon: <LucideFileText /> },
  { label: '상품 조회/수정', path: '', icon: <LucideFileText /> },
  { label: '주문 관리', path: '', icon: <LucideFileText /> },
  { label: '업체 정보 관리', path: '', icon: <LucideFileText /> },
]

const SideNavigation = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const { userType, userName } = useUser()

  const menuList = userType === 'CONSUMER' ? USER_SIDE_MENU : SELLER_SIDE_MENU

  return (
    <nav className={styles[`${userType}-nav`]}>
      <div className={styles['user-name']}>
        <p>
          {userName}
          {userType === 'CONSUMER' ? '님' : ''}
        </p>
      </div>
      <ul className={styles['menu-list']}>
        {menuList.map((menu) => (
          <li key={menu.label}>
            <Link to={menu.path}>
              <div
                className={
                  menu.path === currentPath
                    ? styles['menu-item-active']
                    : styles['menu-item']
                }
              >
                <span>{menu.icon}</span>
                <p>{menu.label}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideNavigation
