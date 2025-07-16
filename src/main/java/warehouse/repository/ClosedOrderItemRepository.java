package warehouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import warehouse.dto.ClosedOrderItem;

public interface ClosedOrderItemRepository extends JpaRepository<ClosedOrderItem, Long> {
    
}
