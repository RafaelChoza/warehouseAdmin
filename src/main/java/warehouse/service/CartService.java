package warehouse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import warehouse.dto.Cart;
import warehouse.dto.User;
import warehouse.repository.CartRepository;
import warehouse.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    UserRepository userRepository;

    public Cart getOrCreateCart(User user) {
        User realUser = userRepository.findById(user.getId())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return cartRepository.findByUserAndActiveTrue(realUser)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(realUser);
                    newCart.setActive(true);
                    return cartRepository.save(newCart);
                });
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Cart getCartById(Long id) {
    return cartRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("No existe el carrito con ese ID"));
}


    public Cart updateCart(Long id, Cart updatedCart) {
        Cart existCart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontro el carrito"));

        existCart.setUser(updatedCart.getUser());
        existCart.setItems(updatedCart.getItems());
        existCart.setActive(updatedCart.getActive());

        return cartRepository.save(existCart);
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }
}
