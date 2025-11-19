import { useOrders } from '@/hooks/queries/myPage/useOrderList'
import useProductList from '@/hooks/queries/product/useProductList'
import MyPageContainer from './MyPageContainer'
import OrderListContents from './OrderListContent'

const OrderList = () => {
  const { data: orderList } = useOrders()
  const { data: productData } = useProductList()

  return (
    <MyPageContainer title="주문 내역">
      {orderList.map((item, index) => (
        <OrderListContents
          key={index}
          data={item}
          product={productData[index]}
        />
      ))}
    </MyPageContainer>
  )
}

export default OrderList
