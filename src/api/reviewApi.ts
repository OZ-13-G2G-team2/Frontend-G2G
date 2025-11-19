// import { API_PATHS } from '@/constants/api'
// import { axiosInstance } from './axios'
import type { ServerReviewType } from '@/types/review'

const reviewApi = {
  // getReviewList: async (): Promise<ServerReviewType[]> => {
  //   const { data } = await axiosInstance.get(API_PATHS.REVIEWS.GET_REVIEW_LIST)
  //   return data
  // },

  // 목데이터 패칭
  getReviewList: async (): Promise<ServerReviewType[]> => {
    return mockReviewList
  },
}

export default reviewApi

const mockReviewList: ServerReviewType[] = [
  {
    id: 10,
    comment: '상품이 너무 마음에 들어요!',
    like_count: 1,
    created_at: '2025-11-18T03:24:53.805Z',
    updated_at: '2025-11-18T03:24:53.805Z',
    user: '1',
    product: 1,
  },
]
