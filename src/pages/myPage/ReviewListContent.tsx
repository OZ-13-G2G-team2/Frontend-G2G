import useProductList from '@/hooks/queries/product/useProductList'
import { useFormatDate } from '@/hooks/useFormatDate'
import Button from '@/shared/components/button'
import type { ReviewType } from '@/types/review'
import './MyPage.scss'

const ReviewListContent = ({ data: reviewData }: { data: ReviewType }) => {
  const { data: productData } = useProductList()
  const review = productData.find(
    ({ productId }) => productId === reviewData.id
  )

  return (
    <div className="contents-wrapper">
      <div className="content-top">
        <img src={review?.thumbnail} alt={review?.productName} />
        <div className="content-info">
          <div className="info-top">
            <span className="review-like">
              {reviewData?.like_count && '추천한 상품'}
            </span>
            <p className="content-name">{review?.productName}</p>
          </div>
          <p className="review-update">
            {useFormatDate(reviewData.updated_at ?? '0')} 작성
          </p>
        </div>
        <div className="review-buttons">
          <Button variant="outline" className="edit-button">
            수정
          </Button>
          <Button variant="outline" className="delete-button">
            삭제
          </Button>
        </div>
      </div>
      <div className="review-comment">
        <p>{reviewData?.comment}</p>
      </div>
    </div>
  )
}

export default ReviewListContent
