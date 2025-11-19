import useProductList from '@/hooks/queries/product/useProductList'
import Button from '@/shared/components/button'
import type { WishList } from '@/types/wishList'
import './MyPage.scss'

const WishListContent = ({ data }: { data: WishList }) => {
  const { data: productData } = useProductList()
  const wish = productData.find(({ productId }) => productId === data.id)
  return (
    <div className="contents-wrapper">
      <div className="contents-overview">
        <img alt={wish?.thumbnail} src={wish?.thumbnail} />
        <section>
          <div>
            <p className="sm-text">{wish?.productName}</p>
            <p className="sm-bold">{wish?.price}원</p>
          </div>
          <div className="row-buttons">
            <Button variant="outline" className="cart-button">
              삭제
            </Button>
            <Button variant="outline" className="buy-button">
              장바구니 담기
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default WishListContent
