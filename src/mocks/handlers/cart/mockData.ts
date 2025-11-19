import type { ServerCart } from '@/types/cart'

export const mockCart: ServerCart[] = [
  {
    id: 1,
    user: 1,
    items: [
      {
        id: 1,
        product: 7,
        product_name: '(영암귀리부인)국내산 친환경유기농 쌀귀리',
        thumbnail: '',
        price: 12000,
        original_price: 22000,
        delivery_fee: 0,
        quantity: 2,
        sub_total: '',
        discount_amount: '10000',
      },
      {
        id: 2,
        product: 1,
        product_name: '대홍단감자',
        thumbnail: '',
        price: 18500,
        original_price: 24000,
        delivery_fee: 0,
        quantity: 1,
        sub_total: '',
        discount_amount: '5500',
      },
    ],
    total_product_price: '',
    total_delivery_fee: '',
    final_price: '',
    created_at: '2025-11-12T15:35:46.811Z',
  },
]
