import { ROUTE_PATHS } from '@/constants/route'
import WishButton from '@/shared/components/WishButton'
import type { ProductListType } from '@/types/productList'
import { API_PATHS } from '@/constants/api'
import axios from 'axios'
import type { ServerReviewType } from '@/types/review'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import reviewIcon from '@/assets/icons/review.svg'
import './Card.scss'
interface CardProps {
  product: ProductListType
}
const Card = ({ product }: CardProps) => {
  const [like, setLike] = useState(false)
  const [reviews, setReviews] = useState<ServerReviewType[]>([])
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(API_PATHS.REVIEWS.GET_REVIEW_LIST)
        setReviews(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchReviews()
  }, [])

  return (
    <li className="card">
      <Link to={`/product/${product.productId}`}>
        <img
          src={product.thumbnail}
          alt={product.productName}
          className="product-img"
        />
      </Link>
      <div className="wish-container">
        <WishButton
          buttonType="card"
          onClick={() => setLike((prev) => !prev)}
          isWish={like}
        ></WishButton>
      </div>
      <div className="info">
        <Link to={ROUTE_PATHS.PRODUCT_LIST.SELLER(product.sellerBusinessName)}>
          <span className="business-name">[{product.sellerBusinessName}]</span>
        </Link>
        <Link to={`/product/${product.productId}`}>
          <h4 className="name">{product.productName}</h4>
          <div>
            {product.discountRate ? (
              <div>
                <span className="final">{product.price}원</span>
                <div>
                  <span className="rate">
                    {parseInt(product.discountRate)}%
                  </span>
                  <span className="price">{product.discountPrice}원</span>
                </div>
              </div>
            ) : (
              <span className="price">{product.price}원</span>
            )}
          </div>
          <div className="review-container">
            <img src={reviewIcon} className="review-icon" />
            <span>{reviews.length}</span>
          </div>
        </Link>
      </div>
    </li>
  )
}

export default Card
