import { orders } from '@/mocks/handlers/myPage/mockData'
import { mappingOrders, type OrderItems } from '@/types/orders'

export const ordersApi = {
  // getOrdersLIST: async (): Promise<OrderItems[]> => {
  //   const { data } = await axiosInstance.get<ServerOrderItems[]>(
  //     API_PATHS.ORDERS.GET_ORDER_LIST
  //   )
  //   return mappingOrders(data)
  // },
  getOrdersLIST: async (): Promise<OrderItems[]> => {
    return mappingOrders(orders)
  },
}
