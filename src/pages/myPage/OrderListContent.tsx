import { useFormatDate } from '@/hooks/useFormatDate'
import Button from '@/shared/components/button'
import type { OrderItems } from '@/types/orders'
import type { ProductListType } from '@/types/productList'

const OrderListContents = ({
  data: orderData,
  product,
}: {
  data: OrderItems
  product: ProductListType
}) => {
  const formattedDate = useFormatDate(orderData.orderDate)

  return (
    <div className="contents-wrapper">
      <div className="contents-overview">
        <img alt={`${product?.productName} 이미지`} src={product?.thumbnail} />
        <section>
          <p className="status">
            {orderData.status === 'completed' ? '결제 완료' : '배송준비중'}
          </p>
          <p className="product-name">{product?.productName}</p>
          <div className="row-texts">
            <p className="sm-text">{orderData.priceAtPurchase}원</p>
            <p className="quantity">{orderData.quantity}개</p>
            <p className="date">{`${formattedDate} 결제`}</p>
          </div>
          <div className="row-buttons">
            <Button variant="outline" className="cart-button">
              장바구니 담기
            </Button>
            <Button variant="outline" className="buy-button">
              바로 구매하기
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OrderListContents
