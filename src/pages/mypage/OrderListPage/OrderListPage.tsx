import { useState } from 'react';
import Header from '@shared/components/Header';
import Footer from '@shared/components/Footer';
import SideNavigation from '@shared/components/SideNavigation';
import Button from '@/shared/components/button';
import Pagination from '@shared/components/Page/PageNation'; // 💡 페이지네이션 컴포넌트 import
import styles from './OrderListPage.module.scss';
import type { Product } from '@/types/product';
import chestnutImg from '@/assets/images/chestnut.jpg';
import appleImg from '@/assets/images/apple.jpg';
import blueberryImg from '@/assets/images/blueberry.jpg';
import potatoImg from '@/assets/images/potato.jpg';
import carrotImg from '@/assets/images/carrot.jpg';
import riceImg from '@/assets/images/rice.jpg';
import beefImg from '@/assets/images/beef.jpg';
import eggImg from '@/assets/images/egg.jpg';
import spinachImg from '@/assets/images/spinach.jpg';
import strawberryImg from '@/assets/images/strawberry.jpg';

// 💡 임의의 더미 데이터 10개로 확장 (페이지네이션 테스트를 위해)
const ALL_ORDERS_DATA: Product[] = [ 
  { id: 1, name: '재협유기농 밤 3kg(5~8과)', price: 19710, img_url: chestnutImg, status: '결제완료' },
  { id: 2, name: '유기농 사과 5kg', price: 25000, img_url: appleImg, status: '배송준비중' },
  { id: 3, name: '싱싱한 블루베리 1kg', price: 15000, img_url: blueberryImg, status: '배송중' },
  { id: 4, name: '제철 감자 10kg', price: 12000, img_url: potatoImg, status: '구매확정' },
  { id: 5, name: '유기농 당근 2kg', price: 8000, img_url: carrotImg, status: '결제완료' },
  { id: 6, name: '친환경 쌀 5kg', price: 30000, img_url: riceImg, status: '배송중' },
  { id: 7, name: '프리미엄 한우 세트', price: 120000, img_url: beefImg, status: '배송준비중' },
  { id: 8, name: '신선 계란 30구', price: 7500, img_url: eggImg, status: '구매확정' },
  { id: 9, name: '해풍 맞은 시금치', price: 4500, img_url: spinachImg, status: '결제완료' },
  { id: 10, name: 'GAP 인증 딸기', price: 18000, img_url: strawberryImg, status: '배송중' },
];

const OrderListPage = () => {
  // 💡 orders를 allOrders로 변경하고 currentPage 상태 추가
  const [allOrders] = useState<Product[]>(ALL_ORDERS_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 페이지당 4개 항목 표시

  // 💡 페이지네이션 로직
  const totalItems = allOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = allOrders.slice(indexOfFirstItem, indexOfLastItem);

  // 💡 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 기존 useEffect는 더미 데이터 설정 로직으로 인해 제거하거나 비워둠.

  return (
    <>
      <Header />
      <main className={styles.container}>
        <SideNavigation userName='이슬비' /> 
        <section className={styles.content}>
          <h2 className={styles.title}>주문 내역</h2>
          <ul className={styles.orderList}>
            {/* 💡 currentOrders를 사용 */}
            {currentOrders.map((order) => ( 
              <li key={order.id} className={styles.orderItem}>
                <img src={order.img_url} alt={order.name} className={styles.image} />
                <div className={styles.info}>
                  <p className={styles.status}>{order.status}</p> 
                  <p className={styles.name}>{order.name}</p>
                  <p className={styles.price}>{order.price.toLocaleString()}원</p>
                </div>
                <div className={styles.actions}>
                  <Button label="장바구니 담기" variant="outline" size="sm" /> 
                  <Button label="바로 구매하기" variant="filled" size="sm" />
                </div>
              </li>
            ))}
          </ul>
          
          {/* 💡 페이지네이션 컴포넌트 추가 및 props 전달 */}
          <div className={styles.paginationWrapper}> 
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default OrderListPage;