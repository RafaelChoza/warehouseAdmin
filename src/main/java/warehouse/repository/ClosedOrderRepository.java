package warehouse.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import warehouse.dto.ClosedOrder;

public interface ClosedOrderRepository extends JpaRepository<ClosedOrder, Long> {
    Optional<ClosedOrder> findByOriginalOrderId(Long orderId);
}
