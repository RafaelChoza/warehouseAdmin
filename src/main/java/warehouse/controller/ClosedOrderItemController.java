package warehouse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import warehouse.service.ClosedOrderItemService;
import warehouse.dto.ClosedOrderItem;

@RestController
public class ClosedOrderItemController {

    @Autowired
    ClosedOrderItemService closedOrderItemService;

    @GetMapping("/closedOrderItem")
    public List<ClosedOrderItem> getAllClosedOrderItems() {
        return closedOrderItemService.getAllClosedOrderItems();
    }
}