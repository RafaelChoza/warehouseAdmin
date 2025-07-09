package warehouse.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import warehouse.dto.CartItem;
import warehouse.service.CartItemService;

@RestController
public class CartItemController {

    @Autowired
    CartItemService cartItemService;

    @GetMapping("/cartItem")
    public ResponseEntity<List<CartItem>> getAllItems() {
        List<CartItem> cartItem = cartItemService.getAllItems();

        return ResponseEntity.ok(cartItem);
    }

    @GetMapping("/cartItem/{id}")
    public ResponseEntity<Optional<CartItem>> getItemById(@PathVariable Long id) {
        Optional<CartItem> carOptional = cartItemService.getItemById(id);
        if(!carOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(carOptional);
    }

    @PostMapping("/cartItem")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody CartItem cartItem) {
        CartItem item = cartItemService.addItemToCart(cartItem);

        return ResponseEntity.ok(item);
    }

    @PutMapping("/cartItem/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id,@RequestBody CartItem cartItem) {
        CartItem itemUpdate = cartItemService.updateCartItem(id, cartItem);

        return ResponseEntity.ok(itemUpdate);
    }

    @DeleteMapping("/cartItem/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);

        return ResponseEntity.notFound().build();
    }

    @PostMapping("cartItem/asignMachine/{id}")
    public ResponseEntity<CartItem> asignMachine(@PathVariable Long id, @RequestParam String idMachine) {
        CartItem cartItem = cartItemService.asignMachine(id, idMachine);
        
        return ResponseEntity.ok(cartItem);
    }

    @PostMapping("/cartItemIncrease/{id}")
    public ResponseEntity<CartItem> increaseItemQuantity(@PathVariable Long id) {
        CartItem itemToIncrease = cartItemService.increaseQuantity(id);

        return ResponseEntity.ok(itemToIncrease);
    }

    @PostMapping("/cartItemDecrease/{id}")
    public ResponseEntity<CartItem> decreaseItemQuantity(@PathVariable Long id) {
        CartItem itemToDecrease = cartItemService.decreaseQuantity(id);

        return ResponseEntity.ok(itemToDecrease);
    }

    @DeleteMapping("/cartEmpty")
    public ResponseEntity<Void> deleteAllItems() {
        cartItemService.deleteAllItems();

        return ResponseEntity.notFound().build();
    }

}
