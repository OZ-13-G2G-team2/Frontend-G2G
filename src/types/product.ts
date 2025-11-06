export interface Product {
  id: number
  name: string
  business_name?: string
  price: number
  discount_rate?: number
  final_price?: number
  img_url?: string
  description?: string
  order_count?: number
  like_count?: number
  review_count?: number
  created_at?: string
  updated_at?: string
  status?: string;
}