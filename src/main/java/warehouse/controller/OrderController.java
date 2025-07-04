package warehouse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import warehouse.dto.Order;
import warehouse.service.OrderService;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/order/{userId}")
    public ResponseEntity<Order> createOrder(@PathVariable Long userId) {
        Order orderCreated = orderService.createOrderFromCart(userId)
        .orElseThrow(() -> new RuntimeException("No existe el usuario"));

        return ResponseEntity.ok(orderCreated);
    }

}
