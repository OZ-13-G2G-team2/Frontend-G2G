import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/shared/components/Header'; // ✅ 경로 수정
import Footer from '@/shared/components/Footer'; // ✅ 경로 수정
import SideNavigation from '@/shared/components/SideNavigation'; // ✅ 경로 수정
import Button from '@/shared/components/button/Button'; // ✅ 경로 수정
import Pagination from '@/shared/components/Page/PageNation'; // ✅ 경로 수정
import styles from './OrderListPage.module.scss';
import type { Product } from '@/types/product';
import { productApi } from '@/api/productApi'; // ✅ productApi import
// ❌ 더미 데이터 이미지 import 및 ALL_ORDERS_DATA 제거

const OrderListPage = () => {
  const [allOrders, setAllOrders] = useState<Product[]>([]); // ✅ MSW로 불러올 데이터 상태
  const location = useLocation();
  const itemsPerPage = 5; // 이미지에 맞춰 5개 항목 표시
  const [isLoading, setIsLoading] = useState(true); // ✅ 로딩 상태 추가

  const [currentPage, setCurrentPage] = useState(1);
  
  // ✅ productApi를 사용하여 데이터 불러오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // 💡 주의: productApi.getAll()은 모든 상품을 가져옵니다. 
        // 실제로는 주문 내역 전용 API 엔드포인트가 필요하지만, 현재는 getAll()을 사용한다고 가정합니다.
        const data = await productApi.getAll(); 
        setAllOrders(data); 
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = Number(params.get('page')) || 1;
    setCurrentPage(page);
  }, [location.search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = allOrders.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <>
      <Header />
      <main className={styles.container}>
        <SideNavigation userName='이슬비' /> 
        <section className={styles.content}>
          <h2 className={styles.title}>주문 내역</h2>

          <ul className={styles.orderList}>
            {isLoading ? ( // ✅ 로딩 상태 처리
                <p className={styles.loading}>주문 내역을 불러오는 중입니다...</p>
            ) : currentOrders.length > 0 ? (
              currentOrders.map((order) => ( 
                <li key={order.id} className={styles.orderItem}>
                  <div className={styles.orderStatus}>{order.status || '결제완료'}</div>
                  <div className={styles.itemDetails}>
                    {/* 💡 order.img_url이 API 응답에 포함되어 있다고 가정 */}
                    <img src={order.img_url} alt={order.name} className={styles.image} /> 
                    <div className={styles.info}>
                      <p className={styles.name}>{order.name}</p>
                      {/* 이미지처럼 가격, 수량, 날짜를 한 줄에 표시 */}
                      <p className={styles.price}>{order.price.toLocaleString()}원</p>
                      <p className={styles.quantityDate}>1개 | 2023.10.28 결제완료</p>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <Button label="장바구니 담기" variant="outline" size="sm" /> 
                    {/* 이미지상 바로 구매하기 버튼이 오른쪽 끝에 위치함 */}
                    <Button label="바로 구매하기" variant="filled" size="sm" />
                  </div>
                </li>
              ))
            ) : (
              <p className={styles.noOrders}>주문 내역이 없습니다.</p>
            )}
          </ul>

          <div className={styles.paginationWrapper}> 
            <Pagination 
              totalItems={allOrders.length}
              itemCountPerPage={itemsPerPage}
              maxPageButtons={5}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default OrderListPage;