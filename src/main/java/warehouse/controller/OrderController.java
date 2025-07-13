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
import org.springframework.web.bind.annotation.RestController;

import warehouse.dto.Order;
import warehouse.dto.OrderItem;
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

    @GetMapping("/order")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> allOrders = orderService.getAllOrders();

        return ResponseEntity.ok(allOrders);
    }

    @PostMapping("/order/{id}/deliver")
    public ResponseEntity<Order> setAsDelivered(@PathVariable Long id) {
        Order orderDelivered = orderService.setOrderAsDelivered(id)
            .orElseThrow(() -> new RuntimeException("No exite la orden con el id: " + id));
            
        return ResponseEntity.ok(orderDelivered);
    }

    @DeleteMapping("/order/{id}")
    public ResponseEntity<Void> deleteOrderById(@PathVariable Long id) {
        orderService.deleteOrderById(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/order/{orderId}/items")
    public ResponseEntity<?> updateOrderItems(
        @PathVariable Long orderId,
        @RequestBody List<OrderItem> updatedItems
    ) {
        try {
            Optional<Order> orderToUpdate = orderService.updateOrderItems(orderId, updatedItems);
            return ResponseEntity.ok(orderToUpdate.get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar los items de la orden:" + e.getMessage());
        }
    }
    

}
