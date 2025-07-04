package warehouse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import warehouse.dto.OrderItem;
import warehouse.service.OrderItemService;

@RestController
public class OrderItemController {

    @Autowired
    OrderItemService orderItemService;

    @GetMapping("/orderItems")
    public ResponseEntity<List<OrderItem>> getAllOrderItems() {
        List<OrderItem> allOrderItems = orderItemService.getAllOrderItems();

        return ResponseEntity.ok(allOrderItems);
    }
}
