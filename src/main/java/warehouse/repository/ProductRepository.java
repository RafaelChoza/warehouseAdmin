package warehouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import warehouse.dto.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
