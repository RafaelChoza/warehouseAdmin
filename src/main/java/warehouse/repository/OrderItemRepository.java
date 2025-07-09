package warehouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import warehouse.dto.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
