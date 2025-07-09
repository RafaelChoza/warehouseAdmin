package warehouse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import warehouse.dto.Cart;
import warehouse.dto.User;
import warehouse.repository.UserRepository;
import warehouse.service.CartService;

@RestController
public class CartController {

    @Autowired
    CartService cartService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/cart")
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> allCarts = cartService.getAllCarts();

        return ResponseEntity.ok(allCarts);
    }

    @GetMapping("/cart/active")
    public ResponseEntity<Cart> getActiveCart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // username del token

        // Obtener el usuario de la base de datos por username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Cart cart = cartService.getOrCreateCart(user.getId());

        return ResponseEntity.ok(cart);
    }

    @PostMapping("/cart")
    public ResponseEntity<Cart> createCart(@RequestParam Long id) {
        Cart cart = cartService.getOrCreateCart(id);

        return ResponseEntity.ok(cart);
    }

    @PutMapping("/cart/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody Cart cart) {
        Cart updatedCart = cartService.updateCart(id, cart);

        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/cart/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable long id) {
        cartService.deleteCart(id);

        return ResponseEntity.notFound().build();
    }

}
