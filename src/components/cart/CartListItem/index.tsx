import { ROUTE_PATHS } from '@/constants/route'
import CheckBox from '@/shared/components/Form/CheckBox/CheckBox'
import type { CartItem } from '@/types/cart'
import type { ProductListType } from '@/types/productList'
import classNames from 'classnames/bind'
import { LucideMinus, LucidePlus, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './CartListItem.module.scss'

const cn = classNames.bind(styles)

interface CartListItemProps {
  item: CartItem
  product: ProductListType
  isChecked: boolean
  onChecked: (productId: number, isChecked: boolean) => void
  onChangeQuantity: (productId: number, newQuantity: number) => void
  onDeleteItem: (productId: number) => void
}

const CartListItem = ({
  item,
  product,
  isChecked,
  onChecked,
  onDeleteItem,
  onChangeQuantity,
}: CartListItemProps) => {
  const handleChangeQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return
    onChangeQuantity(item.productId, newQuantity)
  }

  return (
    <li className={cn('list-item')}>
      <CheckBox
        isChecked={isChecked}
        onCheckedChange={(isChecked) =>
          onChecked(product?.productId, isChecked)
        }
      />
      <div className={cn('item-img')}>
        <Link to={ROUTE_PATHS.PRODUCT_DETAIL.GENERATOR(product?.productId)}>
          <img src={product?.thumbnail} alt={product?.productName} />
        </Link>
      </div>
      <div className={cn('item-info')}>
        <div>
          <Link to={ROUTE_PATHS.PRODUCT_DETAIL.GENERATOR(product?.productId)}>
            <p className={cn('item-name')}>{product?.productName}</p>
          </Link>
          <span className={cn('item-discount')}>
            {item?.price?.toLocaleString()}원
          </span>
          <span className={cn('item-price')}>
            {item?.originalPrice?.toLocaleString()}원
          </span>
        </div>
        <div className={cn('item-quantity')}>
          <button
            type="button"
            onClick={() => handleChangeQuantity(item.quantity - 1)}
            className={cn({ disabled: item.quantity === 1 })}
            disabled={item.quantity === 1}
          >
            <LucideMinus size={16} />
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            onClick={() => handleChangeQuantity(item.quantity + 1)}
          >
            <LucidePlus size={16} />
          </button>
        </div>
      </div>
      <button
        type="button"
        className={cn('item-delete')}
        onClick={() => onDeleteItem(item.productId)}
      >
        <X />
      </button>
    </li>
  )
}

export default CartListItem
