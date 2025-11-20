export const ROUTE_PATHS = {
  HOME: '/',

  MYPAGE: {
    INDEX: '/mypage',
    ORDER_LIST: '/mypage/order-list',
    WISH_LIST: '/mypage/wish-list',
    REVIEWS: '/mypage/review-list',
    INFORMATION: '/mypage/information',
  },

  SELLER: {
    INDEX: '/seller',
    PRODUCTS: '/seller/products',
  },

  SIGNUP: {
    INDEX: '/signup',
    USER: '/signup/user',
    SELLER_CERTIFICATION: '/signup/seller-certification',
    SELLER: '/signup/seller',
  },

  LOGIN: {
    INDEX: '/login',
    USER: '/login/user',
  },
  PRODUCT_LIST: {
    INDEX: '/products',
    NEW: '/products?ordering=-created_at',
    BEST: '/products?ordering=-stats__sales_count',
    SALE: '/products?ordering=-discount_price',
    SORT: (sortValue: string) => `/products?ordering=${sortValue}`,
    CATEGORY: (category_name: string) =>
      `/products?category_name=${category_name}`,
    SELLER: (seller_business_name: string) =>
      `/products?seller_business_name=${seller_business_name}`,
    SEARCH: (q: string) => `products?q=${q}`,
  },
  EMAIL: {
    INDEX: '/email/certification',
    CERTIFICATION: '/email/certification/:email',
  },
  PRODUCT_DETAIL: {
    TEMPLATE: '/product/:id',
    GENERATOR: (id: number) => `/product/${id}`,
  } as const,

  CART: '/cart',
} as const
