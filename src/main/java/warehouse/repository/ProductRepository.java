package warehouse.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import warehouse.dto.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String productName);
}
