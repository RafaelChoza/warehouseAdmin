package warehouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import warehouse.dto.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
