package warehouse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import warehouse.dto.CartItem;
import warehouse.repository.CartItemRepository;

@Service
public class CartItemService {

    @Autowired
    CartItemRepository cartItemRepository;

    public List<CartItem> getAllItems() {
        return cartItemRepository.findAll();
    }

    public Optional<CartItem> getItemById(Long id) {
        return cartItemRepository.findById(id);
    }

    public CartItem addItemToCart(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
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
        cartItemRepository.deleteById(itemId);
        return null;
    }

    cartItem.setQuantity(newQuantity);
    return cartItemRepository.save(cartItem);
}


}
