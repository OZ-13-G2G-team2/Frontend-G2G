import { useState, useEffect } from 'react'; // useEffect, useLocation import를 위해 추가
import { useLocation } from 'react-router-dom'; // URL 쿼리를 읽기 위해 추가
import Header from '@shared/components/Header';
import Footer from '@shared/components/Footer';
import SideNavigation from '@shared/components/SideNavigation';
import Button from '@shared/components/button/Button';
import Pagination from '@shared/components/Page/PageNation'; 
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

const ALL_ORDERS_DATA: Product[] = [ 
  // ... (10개 항목)
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
  const [allOrders] = useState<Product[]>(ALL_ORDERS_DATA);
  const location = useLocation(); // URL 위치 정보 사용
  const itemsPerPage = 5; // 페이지당 항목 수

  // 💡 URL 쿼리에서 현재 페이지 번호 가져오기
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = Number(params.get('page')) || 1;
    setCurrentPage(page);
  }, [location.search]);

  // 💡 데이터 슬라이싱 로직
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = allOrders.slice(indexOfFirstItem, indexOfLastItem);
  
  // 전체 아이템 수는 Pagination 컴포넌트에게 전달

  return (
    <>
      <Header />
      <main className={styles.container}>
        <SideNavigation userName='이슬비' /> 
        <section className={styles.content}>
          <h2 className={styles.title}>주문 내역</h2>

          <ul className={styles.orderList}>
            {/* 💡 슬라이싱된 currentOrders 사용 */}
            {currentOrders.map((order) => ( 
              <li key={order.id} className={styles.orderItem}>
                {/* ... (상품 정보 및 버튼 렌더링) */} 

                {/* ✅ Button 컴포넌트 사용을 복구합니다. */}
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

          <div className={styles.paginationWrapper}> 
            <Pagination 
              totalItems={allOrders.length} // 총 아이템 수 전달
              itemCountPerPage={itemsPerPage} // 페이지당 항목 수 전달
              // maxPageButtons는 기본값 5 사용 가능
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default OrderListPage;