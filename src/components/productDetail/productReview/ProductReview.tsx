import '@/components/productDetail/productReview/ProductReview.scss'
import type { Product } from '@/types/product'
import recommendIcon from '@/assets/icons/recommend-black.svg'
import { API_PATHS } from '@/constants/api'
import axios from 'axios'
import type { ServerReviewType } from '@/types/review'
import { useState, useEffect } from 'react'
interface ProductReviewProps {
  item: Product
}
function ProductReview({ item }: ProductReviewProps) {
  const [isAddClick, setIsAddClick] = useState(false)
  const [reviews, setReviews] = useState<ServerReviewType[]>([])
  const handleclick = () => {
    setIsAddClick((prev) => !prev)
  }
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(API_PATHS.REVIEWS.GET_REVIEW_LIST)
        setReviews(Array.isArray(response.data) ? response.data : [])
      } catch (err) {
        console.log(err)
        setReviews([])
      }
    }
    fetchReviews()
  }, [])
  return (
    <div id="product-review">
      <div className="review-title">상품 후기</div>
      <div className="review-count">
        <img src={recommendIcon} />
        {/* 추천해요 아이콘 누를시 api연동 및 ui 바뀌게 구현하기 */}
        {reviews.length}명이 이 상품을 추천해요
      </div>
      <div className="review-list-box">
        {/* 임시 이미지. 추후 리뷰 api 구현되면 매핑으로 진행할 예정 (5개만 나오게) */}
        {Array.isArray(reviews) &&
          reviews
            .filter((review) => review.images && review.images.length > 0)
            .slice(0, 5)
            .map((review) => (
              <div className="temporary-box" key={review.id}>
                <img src={review.images![0]} alt="" className="temporary-img" />
              </div>
            ))}

        <div className="temporary-box black" onClick={handleclick}>
          + 더보기
        </div>
      </div>
      {isAddClick && (
        <div>
          <div className="all-review-box">
            {/* api 연동시키기 + 전체 눌렀을떄 전체가 나오게하기, 사진, 추천도 마찬가지 */}
            {/* <span>전체</span>
            <span>|</span>
            <span>사진</span>
            <span>|</span>
            <span>추천</span> */}
          </div>
          <div className="review-detail">
            {Array.isArray(reviews) &&
              reviews?.map?.((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-user-name">{review.user}</div>
                  <div className="review-content">
                    <p className="default-ment">{item.name}</p>
                    {review.comment}
                    {review.images?.[0] && (
                      <img
                        src={review.images[0]}
                        alt={item.name}
                        className="review-img"
                      />
                    )}
                    <p className="review-date">{review.created_at}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default ProductReview
