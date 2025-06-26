package warehouse.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import warehouse.dto.Cart;
import warehouse.dto.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserAndActiveTrue(User user);
}
