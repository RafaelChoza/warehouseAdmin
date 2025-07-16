package warehouse.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import warehouse.dto.ClosedOrder;
import warehouse.service.ClosedOrderService;

@RestController
public class ClosedOrderController {

    @Autowired
    ClosedOrderService closedOrderService;

    @PostMapping("/closedOrder/{orderId}")
    public ResponseEntity<ClosedOrder> convertOrderToClosedOrder(@PathVariable Long orderId) {
        ClosedOrder orderToClose = closedOrderService.createClosedOrderFromOrder(orderId)
                .orElseThrow(() -> new RuntimeException("No existe orden con el id: " + orderId));

        return ResponseEntity.ok(orderToClose);
    }

    @GetMapping("/closedOrder")
    public ResponseEntity<List<ClosedOrder>> getAllClosedOrders() {
        List<ClosedOrder> allClosedOrders = closedOrderService.getAllClosedOrders();

        return ResponseEntity.ok(allClosedOrders);
    }

    @GetMapping("/getClosedOrder/{orderId}")
    public ResponseEntity<ClosedOrder> getClosedOrderById(@PathVariable Long orderId) {
        ClosedOrder order = closedOrderService.getClosedOrderById(orderId);

        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/closedOrder/{orderId}")
    public ResponseEntity<Void> deleteClosedOrderById(@PathVariable Long orderId) {
        closedOrderService.deleteOrderById(orderId);
        System.out.println("Order cerrada borrada");
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getProductQuantities")
    public ResponseEntity<Map<String, Long>> getProductQuantities() {
        Map<String, Long> productQuantity = closedOrderService.getProductQuantityMap();
        return ResponseEntity.ok(productQuantity);
    }

    @GetMapping("/quantityProduct/by-date")
    public ResponseEntity<Long> getQuantityByProductIdAndDateRange(
            @RequestParam("productId") Long productId,
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {

        Long quantity = closedOrderService.getTotalQuantityOfProductInClosedOrdersBetweenDates(productId, startDate,
                endDate);
        return ResponseEntity.ok(quantity);
    }

    @GetMapping("/itemConsumptionLastMonth/{productId}")
    public ResponseEntity<Long> getQuantityLastMonth(@PathVariable Long productId) {
        Long quanityLastMonth = closedOrderService.getConsumptionByLastMonthByProduct(productId);
        return ResponseEntity.ok().body(quanityLastMonth);
    }
}
