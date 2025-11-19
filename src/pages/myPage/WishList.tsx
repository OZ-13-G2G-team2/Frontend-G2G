import { useWishList } from '@/hooks/queries/myPage/useWishList'
import MyPageContainer from './MyPageContainer'
import WishListContent from './WishListContent'

const WishList = () => {
  const { data } = useWishList()

  return (
    <MyPageContainer title="찜한 상품">
      {data?.map((wish) => (
        <WishListContent key={wish.id} data={wish} />
      ))}
    </MyPageContainer>
  )
}

export default WishList
