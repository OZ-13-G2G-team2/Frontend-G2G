import CartListItem from '@/components/cart/CartListItem'
import { ROUTE_PATHS } from '@/constants/route'
import useCart from '@/hooks/queries/cart/useCart'
import useDeleteCartItems from '@/hooks/queries/cart/useDeleteCartItems'
import useUpdateCartItem from '@/hooks/queries/cart/useUpdateCartItem'
import useInfo from '@/hooks/queries/myPage/useInfo'
import useProductList from '@/hooks/queries/product/useProductList'
import Button from '@/shared/components/button'
import CheckBox from '@/shared/components/Form/CheckBox/CheckBox'
import { useUser } from '@/stores/userContext'
import classNames from 'classnames/bind'
import { LucideMapPin } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './cart.module.scss'

const cn = classNames.bind(styles)

const Cart = () => {
  // TODO: userID 없이 정보 조회 가능하던가 / 로그인 응답 값으로 id 주던가
  const { userId } = useUser()
  const { data: userData } = useInfo(Number(userId))
  const { data: cartData, isLoading } = useCart()
  const { data: productData } = useProductList()
  const { mutate: deleteItems } = useDeleteCartItems()
  const { mutate: updateQuantity } = useUpdateCartItem()
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const navigate = useNavigate()

  const initialized = useRef(false)

  // data가 변경될 때 마다 전체 선택 상태로 업데이트
  useEffect(() => {
    const items = cartData?.[0]?.items
    if (items && items.length > 0 && !initialized.current) {
      const allItemIds = items.map((item) => item.productId)
      setSelectedItems(allItemIds)
      initialized.current = true
    }
  }, [cartData])

  // const cart = cartData?.[0] || []
  const cartItems = cartData?.[0]?.items || []

  // 전체 아이템 ID 목록
  const allItemIds = useMemo(
    () => cartItems.map((item) => item.productId),
    [cartItems]
  )

  // 전체 선택 여부
  const isAllSelected = useMemo(
    () => selectedItems.length > 0 && selectedItems.length === cartItems.length,
    [cartItems.length, selectedItems.length]
  )

  // 선택된 아이템들만 필터링
  const selectedCartItems = useMemo(
    () => cartItems.filter((item) => selectedItems.includes(item.productId)),
    [cartItems, selectedItems]
  )

  // 결제 금액 계산
  const amounts = useMemo(() => {
    const totalOriginalProductPrice = selectedCartItems.reduce(
      (acc, item) => acc + Number(item.originalPrice) * item.quantity,
      0
    )
    const totalProductPrice = selectedCartItems.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    )
    const totalDiscount = selectedCartItems.reduce(
      (acc, item) => acc + Number(item.discountAmount) * item.quantity,
      0
    )
    const deliveryFee = selectedCartItems.reduce(
      (acc, item) => acc + Number(item.deliveryFee) * item.quantity,
      0
    )

    return {
      totalOriginalProductPrice,
      totalProductPrice,
      totalDiscount,
      deliveryFee,
      payAmount: totalProductPrice + deliveryFee,
    }
  }, [selectedCartItems])

  // 전체 선택 체크박스 핸들러
  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? allItemIds : [])
  }

  // 개별 선택 체크박스 핸들러
  const handleSelectItem = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, productId])
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== productId))
    }
  }

  // 수량 변경 핸들러
  const handleChangeQuantity = (productId: number, quantity: number) => {
    updateQuantity({ productId, quantity })
  }

  // 선택 삭제 버튼 핸들러
  const handleDeleteSelected = () => {
    deleteItems({ productIds: selectedItems })
    setSelectedItems([])
  }

  // 개별 삭제 핸들러
  const handleDeleteItem = (productId: number) => {
    deleteItems({ productIds: [productId] })
    setSelectedItems((prev) => prev.filter((id) => id !== productId))
  }

  if (isLoading) return <div>로딩 중...</div>
  // if (error) return <div>에러: {error.message}</div>

  return (
    <div className={cn('wrap')}>
      <div className={cn('title')}>
        <h2>장바구니</h2>
      </div>
      <div className={cn('cart-wrap')}>
        <div className={cn('cart-left')}>
          <div className={cn('select-header')}>
            <CheckBox
              label={`전체선택 ${selectedItems.length}/${cartItems.length}`}
              id="cart-select-all"
              isChecked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
            <button
              className={cn({ disabled: selectedItems.length === 0 })}
              type="button"
              onClick={handleDeleteSelected}
              disabled={selectedItems.length === 0}
            >
              선택삭제
            </button>
          </div>

          {/* 장바구니 아이템 목록 */}
          <ul className={cn('list-wrap')}>
            {cartData.length === 0 ? (
              <div>장바구니가 비어있습니다.</div>
            ) : (
              cartItems.map((item, index) => (
                <CartListItem
                  key={item.id}
                  item={item}
                  product={productData[index]}
                  onDeleteItem={handleDeleteItem}
                  onChangeQuantity={handleChangeQuantity}
                  isChecked={selectedItems.includes(item.productId)}
                  onChecked={handleSelectItem}
                />
              ))
            )}
          </ul>
          <div className={cn('products')}></div>
          <div className={cn('total-wrap')}>
            <p className={cn('total-detail')}>
              상품 {amounts.totalProductPrice.toLocaleString()}원 + 배송비
              {amounts.deliveryFee
                ? ` ${amounts.deliveryFee.toLocaleString()}원 `
                : ' 무료'}
            </p>
            <p className={cn('total')}>
              {' '}
              {amounts.payAmount.toLocaleString()}원
            </p>
          </div>
        </div>
        <div className={cn('cart-right')}>
          <div className={cn('address-wrap')}>
            <div className={cn('address-title')}>
              <LucideMapPin />
              <p>배송지</p>
            </div>
            <div className={cn('address-edit')}>
              <p>{userData?.address}</p>
              <button type="button">변경</button>
            </div>
          </div>
          <div className={cn('amount-wrap')}>
            <div className={cn('amount-title')}>
              <p>결제금액</p>
            </div>
            <div className={cn('amount-detail')}>
              <div className={cn('amount-pair')}>
                <p>상품금액</p>
                <p className={cn('amount-semibold')}>
                  {amounts.totalOriginalProductPrice.toLocaleString()}원
                </p>
              </div>
              <div className={cn('amount-pair')}>
                <p>상품할인금액</p>
                <p className={cn('amount-semibold', 'amount-discount')}>
                  -{amounts.totalDiscount?.toLocaleString()}원
                </p>
              </div>
              <div className={cn('amount-pair')}>
                <p>배송비</p>
                <p className={cn('amount-semibold')}>
                  {amounts.deliveryFee.toLocaleString()}원
                </p>
              </div>
            </div>
            <div className={cn('amount-total')}>
              <p>결제예정금액</p>
              <p className={cn('amount-bold')}>
                {amounts.payAmount.toLocaleString()}원
              </p>
            </div>
          </div>
          {/* TODO: 주문 상품 등록 api 연동 및 구매 완료 모달 노출*/}
          <Button
            onClick={() => {
              alert('주문이 완료되었습니다.')
              navigate(ROUTE_PATHS.MYPAGE.INDEX)
            }}
            variant="filled"
            isFullWidth
            type="button"
          >
            구매하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart
