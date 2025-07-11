package warehouse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import warehouse.dto.Cart;
import warehouse.dto.CartItem;
import warehouse.dto.Product;
import warehouse.repository.CartItemRepository;
import warehouse.repository.CartRepository;
import warehouse.repository.ProductRepository;

@Service
public class CartItemService {

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductService productService;

    public List<CartItem> getAllItems() {
        return cartItemRepository.findAll();
    }

    public Optional<CartItem> getItemById(Long id) {
        return cartItemRepository.findById(id);
    }

    public CartItem addItemToCart(CartItem cartItem) {
        Long productId = cartItem.getProduct().getId();
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Long cartId = cartItem.getCart().getId();
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        // Buscar si ya existe ese producto en ese carrito
        Optional<CartItem> existingCartItemOp = cartItemRepository.findByCartIdAndProductId(cartId, productId);

        if (existingCartItemOp.isPresent()) {
            CartItem existingCartItem = existingCartItemOp.get();
            existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItem.getQuantity());
            productService.decreaseQuantityProduct(productId, cartItem.getQuantity().intValue());
            return cartItemRepository.save(existingCartItem);
        } else {
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            return cartItemRepository.save(cartItem);
        }
    }

    public CartItem updateCartItem(Long id, CartItem updatedCartItem) {
        CartItem existCartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el item"));

        existCartItem.setProduct(updatedCartItem.getProduct());
        existCartItem.setCart(updatedCartItem.getCart());
        existCartItem.setQuantity(updatedCartItem.getQuantity());

        return cartItemRepository.save(existCartItem);
    }

    public void deleteCartItem(Long id) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el item con ID: " + id));

        Long productId = cartItem.getProduct().getId();
        Integer quantityToReturn = cartItem.getQuantity().intValue();

        productService.increaseQuantityProduct(productId, quantityToReturn);

        cartItemRepository.deleteById(id);
    }

    public CartItem increaseQuantity(Long itemId) {
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("No se encontró el item con ID: " + itemId));

        Long newQuantity = cartItem.getQuantity() + 1;

        if (newQuantity < 0) {
            throw new IllegalArgumentException("La cantidad no puede ser negativa");
        }

        cartItem.setQuantity(newQuantity);
        return cartItemRepository.save(cartItem);
    }

    public CartItem decreaseQuantity(Long itemId) {
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("No se encontró el item con ID: " + itemId));

        Long newQuantity = cartItem.getQuantity() - 1;

        if (newQuantity < 0) {
            throw new IllegalArgumentException("La cantidad no puede ser negativa");
        }

        if (newQuantity == 0) {
            // Si se va a eliminar el item, regresamos la última unidad al inventario
            cartItemRepository.deleteById(itemId);
            return null;
        } else {
            // Si solo se reduce la cantidad, disminuimos el inventario
            cartItem.setQuantity(newQuantity);
            return cartItemRepository.save(cartItem);
        }
    }

    public void deleteAllItems() {
        cartItemRepository.deleteAll();
    }

    public CartItem asignMachine(Long id, String idMachine) {
        CartItem cartItem = cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encuentra el item con el id :" + id));
        cartItem.setForMachine(idMachine);
        return cartItemRepository.save(cartItem);
    }

}
