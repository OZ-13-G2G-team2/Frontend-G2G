import type { ServerOrderItems } from '@/types/orders'
import type { ServerWishList } from '@/types/wishList'


export const orders: ServerOrderItems[] = [
  {
    id: 1,
    order: 1,
    product: 1,
    product_name: '고창 햅쌀 10kg',
    product_image: '',
    quantity: 5,
    price_at_purchase: '32000',
    subtotal: '32000',
    order_status: 'completed',
    order_date: '2025-11-11T12:55:41.311Z',
  },
  {
    id: 2,
    order: 1,
    product: 2,
    product_name: '하동 봄녹차 200g',
    product_image: '',
    quantity: 5,
    price_at_purchase: '18000',
    subtotal: '18000',
    order_status: 'pending',
    order_date: '2025-11-11T12:55:41.311Z',
  },
  {
    id: 3,
    order: 1,
    product: 3,
    product_name: '청송 GAP 인증 사과 5kg',
    product_image: '',
    quantity: 5,
    price_at_purchase: '45000',
    subtotal: '45000',
    order_status: 'completed',
    order_date: '2025-11-11T12:55:41.311Z',
  },
  {
    id: 4,
    order: 1,
    product: 4,
    product_name: '횡성 한우 1+ 등급 등심 500g',
    product_image: '',
    quantity: 5,
    price_at_purchase: '68000',
    subtotal: '68000',
    order_status: 'completed',
    order_date: '2025-11-11T12:55:41.311Z',
  },
]

export const wishLists: ServerWishList[] = [
  {
    id: 6,
    user: 1,
    product: 1,
    is_active: true,
    created_at: "2025-11-12T15:35:46.811Z"
  },
  {
    id: 7,
    user: 1,
    product: 2,
    is_active: false,
    created_at: "2025-11-12T15:35:46.811Z"
  }
]