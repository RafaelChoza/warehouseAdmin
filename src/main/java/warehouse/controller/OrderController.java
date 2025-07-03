package warehouse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import warehouse.dto.Order;
import warehouse.dto.User;
import warehouse.service.OrderService;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/order")
    public ResponseEntity<Order> createOrder(@RequestBody User user) {
        
        Order orderCreated = orderService.createOrderFromCart(user)
        .orElseThrow(() -> new RuntimeException("No existe el usuario"));

        return ResponseEntity.ok(orderCreated);
    }

}
