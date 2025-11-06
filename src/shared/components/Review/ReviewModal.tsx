import '@/shared/components/Review/ReviewModal.scss'
import recommendIcon from '@/assets/icons/recommend.svg'
import recommendClickIcon from '@/assets/icons/recommend-click.svg'
import Button from '@/shared/components/button/Button'
import { useState } from 'react'

interface ModalProps {
  title: string
  subTitle: string
  btnCompleteLabel: string
  placeHolder: string
}
function ReviewModal({
  title = '후기 작성하기',
  subTitle = '상품에 만족하셨나요?',
  btnCompleteLabel = '등록',
  placeHolder = '어떤 점이 좋았나요?',
}: ModalProps) {
  const [isRecommended, setIsRecommended] = useState(false)
  const handleRecommendClick = () => {
    setIsRecommended((prev) => !prev)
  }
  return (
    <div className="modal-overlay">
      <div className="review-modal">
        <div className="title">{title}</div>
        <div className="recommend">
          <div className="sub-title">{subTitle}</div>
          <div className="recommend-text">
            만족하셨다면 다른 고객님에게 도움이 되도록 추천해요를 눌러주세요
          </div>
          {/* 추천버튼 눌렀을때랑 누르지 않았을때 스타일 차별화 */}
          <div
            className={`recommend-btn ${isRecommended ? `click` : ``}`}
            onClick={handleRecommendClick}
          >
            <img
              src={isRecommended ? recommendClickIcon : recommendIcon}
              alt="recommend-icon"
            />
            <div className={`btn-context ${isRecommended ? `click` : ``}`}>
              추천해요
            </div>
          </div>
        </div>
        <div className="review-content">
          <div className="review-title">상세 후기 쓰기</div>
          <textarea
            className="review-content-textarea"
            placeholder={placeHolder}
          ></textarea>
        </div>
        {/* 버튼 공통 컴포넌트 활용 */}
        <Button
          size="lg"
          variant="outline"
          label="사진 첨부하기"
          isFullWidth
          type="button"
        />
        {/* 추후 사진 첨부 기능 구현 */}
        <div className="btn-box">
          <Button size="md" variant="text" label="취소" type="button" />
          {/* 취소 눌렀을대 로직 구현해야함 */}
          <Button
            size="md"
            variant="filled"
            label={btnCompleteLabel}
            type="submit"
          />
          {/*등록 누를시 Post 해야함*/}
        </div>
      </div>
    </div>
  )
}
{
  /* <ReviewModal
      title="맨위 제목"
      subTitle="중간 제목"
      btnCompleteLabel="버튼 이름"
      placeHolder="placeholder"
    />  
    이런식으로 작성해주시면 됩니다.*/
}
export default ReviewModal
