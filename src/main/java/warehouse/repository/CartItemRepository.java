package warehouse.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import warehouse.dto.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);
}
