package warehouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import warehouse.dto.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
