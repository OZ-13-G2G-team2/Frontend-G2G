import '@/components/productDetail/summarizeDetail/SummarizeDetail.scss'
import OptionModal from '@/shared/components/Form/Option/OptionModal'
import Button from '@/shared/components/button'
import WishButton from '@/shared/components/WishButton'
import type { Product } from '@/types/product'
import { useState } from 'react'
import PlusIcon from '@/assets/icons/plus.svg'
import MinusIcon from '@/assets/icons/minus.svg'
import { useUser } from '@/stores/userContext'
import BackToLogin from '@/components/productDetail/backToLogin/BackToLogin'
import { useNavigate } from 'react-router-dom'
// import { getAccessToken } from '@/api/auth'
// import { jwtDecode } from 'jwt-decode'
// import type { UserJwtPayload } from '@/types/jwtPayload'
// import { cartAddApi } from '@/api/cartAddApi'
// import { addWishListApi } from '@/api/wishListApi'
import MoveToCart from '@/components/productDetail/moveToCart/MoveToCart'
import { ROUTE_PATHS } from '@/constants/route'

interface SummarizeDetailProps {
  item: Product
}
function SummarizeDetail({ item }: SummarizeDetailProps) {
  // const params = useParams()
  const [count, setCount] = useState<number>(1)
  const { userType } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [like, setLike] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [selectedExtraPrice, setSelectedExtraPrice] = useState<number>(0)
  const [isCartMove, setIsCartMove] = useState(false)
  // const productId = Number(params.id)
  const navigate = useNavigate()
  // const token = getAccessToken() ?? ''
  // const payload = jwtDecode<UserJwtPayload>(token)
  // const userId = Number(payload.user_id)
  const discountPrice = Number(item?.discount_price)
  const handleAddToCount = () => {
    setCount((prev) => prev + 1)
  }
  const handleDelToCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1)
      // console.log(item?.images?.[0]?.image_url)
    }
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsCartMove(false)
  }
  const handleClickAddToCart = async () => {
    // 장바구니 담기 눌렀을때의 로직
    if (userType === 'GUEST') {
      setIsModalOpen(true)
    } else {
      // try {
      //   const cartInformation = {
      //     // user_id: userId,
      //     product_id: productId,
      //     quantity: count,
      //   }
      // const response = await cartAddApi.cartAdd(cartInformation)
      setIsCartMove(true)
      // console.log(response)
      // } catch (err) {
      //   console.log(err)
      // }
    }
  }

  const handleClickPurchase = () => {
    if (userType === 'GUEST') {
      setIsModalOpen(true)
    } else {
      navigate(ROUTE_PATHS.MYPAGE.ORDER_LIST)
    }
  }
  const handleClickWishList = async () => {
    // 찜목록 눌렀을때의 로직
    if (userType === 'GUEST') {
      setIsModalOpen(true)
    } else {
      // try {
      //   const wishListAddData = {
      //     user: userId,
      //     product: productId,
      //   }
      //   console.log(wishListAddData)
      //   const response = await addWishListApi.postWishList(wishListAddData)
      //   console.log(response)
      setLike((prev) => !prev)
      // } catch (err) {
      //   console.log(err)
      // }
    }
  }
  return (
    <>
      {isModalOpen && <BackToLogin onClick={handleCloseModal} />}
      {isCartMove && <MoveToCart onClick={handleCloseModal} />}
      <div className="detail-box">
        <div className="product-detail-top-box">
          <img
            className="representative-img"
            src={item?.images?.[0]?.image_url?.replace(':8000', '') || ''}
            alt={item?.name}
          />
          <div className="product-simple-description">
            <div className="top-description">
              [{item?.seller_business_name}]
            </div>
            <div className="product-detail-title">{item?.name}</div>
            <div className="product-detail-price">
              <div className="discount-box">
                {discountPrice > 0 && (
                  <div className="discount-container">
                    <div className="product-discount-rate">
                      {parseInt(item?.discount_rate ?? '0')}%
                    </div>
                    <div className="product-discount-price">
                      {parseInt(item?.discount_price ?? '0').toLocaleString()}원
                    </div>
                  </div>
                )}
                <span className={discountPrice > 0 ? 'product-del-price' : ''}>
                  {parseInt(item?.price ?? '0').toLocaleString()}원
                </span>
              </div>
            </div>
            <div className="product-detail-fix-box">
              <div className="product-detail-origin-row">
                <span className="label">원산지</span>
                <span className="product-detail-text">{item?.origin}</span>
              </div>
              <div className="product-detail-origin-row">
                <span className="label">판매자</span>
                <span className="product-detail-text">
                  {item?.seller_business_name}
                </span>
              </div>
              <div className="product-detail-origin-row">
                <span className="label">배송비</span>
                <span className="product-detail-text">
                  {/* 배송비가 0원일때는 무료배송, 아니면 000원 이런식으로  */}
                  {parseInt(item?.delivery_fee || '0') === 0
                    ? '무료배송'
                    : `${parseInt(item?.delivery_fee || '0').toLocaleString()}원`}
                </span>
              </div>
              <div className="product-detail-option-box">
                <span className="label">필수선택</span>
                <OptionModal
                  size="lg"
                  placeHolder="필수 옵션을 선택해주세요"
                  className="modal-css"
                  option={item?.option_values}
                  onSelectOption={(name, price) => {
                    setSelectedOption(name)
                    setSelectedExtraPrice(price)
                  }}
                />
              </div>
              <div className="product-count-box">
                <span className="selected-option">
                  {selectedOption || '선택한 옵션명'}
                </span>
                {/* 이부분도 옵션명 받아와야함 */}
                <div className="count-box">
                  <img
                    src={MinusIcon}
                    className="calculate-btn"
                    onClick={handleDelToCount}
                  />
                  <span>{count}</span>
                  <img
                    src={PlusIcon}
                    className="calculate-btn"
                    onClick={handleAddToCount}
                  />
                </div>
              </div>
              <div className="product-total-price-box">
                <span className="product-total-price">총 합계금액</span>
                <span className="total-price">
                  {discountPrice > 0
                    ? (
                        (parseInt(item?.discount_price ?? '0') +
                          selectedExtraPrice) *
                        count
                      ).toLocaleString()
                    : (
                        (parseInt(item?.price ?? '0') + selectedExtraPrice) *
                        count
                      ).toLocaleString()}
                  원
                </span>
              </div>
              <Button size="xlg" variant="filled" onClick={handleClickPurchase}>
                바로 구매하기
                {/* 이부분 ui 어떻게 처리해야할지.... */}
              </Button>
              <div className="wish-add-to-cart-box">
                <WishButton
                  buttonType="detail"
                  isWish={like}
                  onClick={handleClickWishList}
                  // 추후 좋아요 눌렀을때의 로직 처리
                />
                <Button
                  size="mlg"
                  variant="gray"
                  onClick={handleClickAddToCart}
                >
                  장바구니 담기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SummarizeDetail
