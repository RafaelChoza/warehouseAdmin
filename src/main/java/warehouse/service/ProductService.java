package warehouse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import warehouse.repository.ProductRepository;
import warehouse.dto.Product;;

@Service
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductbyId(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product productUpdated) {
        System.out.println(productUpdated);
        Product existsProduct = productRepository.findById(productUpdated.getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (productUpdated != null) {
            existsProduct.setName(productUpdated.getName());
            existsProduct.setDescription(productUpdated.getDescription());
            existsProduct.setVendor(productUpdated.getVendor());
            existsProduct.setQuantity(productUpdated.getQuantity());
            existsProduct.setKanbanQuantity(productUpdated.getKanbanQuantity());
            existsProduct.setPrice(productUpdated.getPrice());
            existsProduct.setMro(productUpdated.getMro());
        }

        return productRepository.save(existsProduct);
    }

    public Optional<Product> findProductByName(String productName) {
        return productRepository.findByName(productName);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product decreaseQuantityProduct(Long productId, Long quantityToDecrease) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (product.getQuantity() == null || product.getQuantity() < quantityToDecrease) {
            throw new RuntimeException("Cantidad insuficiente en inventario");
        }

        product.setQuantity(product.getQuantity() - quantityToDecrease);
        return productRepository.save(product);
    }

    public Product increaseQuantityProduct(Long productId, Long quantityToIncrease) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        product.setQuantity(product.getQuantity() + quantityToIncrease);
        return productRepository.save(product);
    }

}
