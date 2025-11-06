import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/shared/components/Header'; // ✅ 경로 수정
import Footer from '@/shared/components/Footer'; // ✅ 경로 수정
import SideNavigation from '@/shared/components/SideNavigation'; // ✅ 경로 수정
import Button from '@/shared/components/button/Button'; // ✅ 경로 수정
import Pagination from '@/shared/components/Page/PageNation'; // ✅ 경로 수정
import styles from './OrderListPage.module.scss';
import type { Product } from '@/types/product';

const OrderListPage = () => {
  const [allOrders, setAllOrders] = useState<Product[]>([]); // ✅ MSW로 불러올 데이터 상태
  const location = useLocation();
  const itemsPerPage = 5; // ✅ 이미지에 맞춰 한 페이지당 항목 수 5개로 설정

  const [currentPage, setCurrentPage] = useState(1);
  
  // ✅ MSW를 활용하여 데이터 불러오기
  useEffect(() => {
    // 실제 API 엔드포인트에 맞게 URL 수정 필요
    // MSW 설정에 따라 fetch 또는 axios 사용
    fetch('/api/orders') // 예시: MSW 핸들러가 /api/orders 요청을 처리한다고 가정
      .then(res => res.json())
      .then((data: Product[]) => {
        setAllOrders(data);
      })
      .catch(error => {
        console.error("Failed to fetch orders:", error);
        // 오류 처리: 더미 데이터를 로드하거나 사용자에게 메시지 표시
        // setAllOrders(ALL_ORDERS_DATA); // MSW 실패 시 더미 데이터 사용 (선택 사항)
      });
  }, []); // 컴포넌트 마운트 시 한 번만 실행

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
            {currentOrders.length > 0 ? ( // ✅ 데이터 로딩 전/후 처리
              currentOrders.map((order) => ( 
                <li key={order.id} className={styles.orderItem}>
                  <div className={styles.orderStatus}>{order.status}</div> {/* ✅ 상태를 별도로 분리 */}
                  <div className={styles.itemDetails}>
                    <img src={order.img_url} alt={order.name} className={styles.image} />
                    <div className={styles.info}>
                      <p className={styles.name}>{order.name}</p>
                      <p className={styles.price}>{order.price.toLocaleString()}원</p>
                      <p className={styles.quantityDate}>1개 | 2023.10.28 결제완료</p> {/* ✅ 이미지 참고: 수량 및 날짜 추가 */}
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <Button label="장바구니 담기" variant="outline" size="sm" /> 
                    <Button label="바로 구매하기" variant="filled" size="sm" />
                  </div>
                </li>
              ))
            ) : (
              <p className={styles.noOrders}>주문 내역이 없습니다.</p> // ✅ 주문 내역이 없을 때 메시지
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