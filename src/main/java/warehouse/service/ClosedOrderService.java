package warehouse.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import warehouse.dto.ClosedOrder;
import warehouse.dto.ClosedOrderItem;
import warehouse.dto.Order;
import warehouse.dto.Product;
import warehouse.mailSender.EmailSenderService;
import warehouse.repository.ClosedOrderItemRepository;
import warehouse.repository.ClosedOrderRepository;
import warehouse.repository.OrderRepository;

@Service
public class ClosedOrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ClosedOrderRepository closedOrderRepository;

    @Autowired
    ClosedOrderItemRepository closedOrderItemRepository;

    @Autowired
    ProductService productService;

    @Autowired
    EmailSenderService emailSenderService;

    public Optional<ClosedOrder> createClosedOrderFromOrder(Long orderId) {
        Order orderToClose = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("No existe la orden con el id: " + orderId));

        ClosedOrder closedOrder = new ClosedOrder();
        closedOrder.setUser(orderToClose.getUser());
        closedOrder.setOriginalOrderId(orderToClose.getId());

        List<ClosedOrderItem> closedOrderItems = orderToClose.getItems().stream().map(item -> {
            ClosedOrderItem closedOrderItem = new ClosedOrderItem();
            closedOrderItem.setProduct(item.getProduct());
            closedOrderItem.setForMachine(item.getForMachine());
            closedOrderItem.setQuantity(item.getQuantity());
            productService.decreaseQuantityProduct(item.getProduct().getId(), item.getQuantity());
            closedOrderItem.setKanbanQuantity(item.getKanbanQuantity());
            closedOrderItem.setClosedOrder(closedOrder);

            if (item.getProduct().getQuantity() <= item.getProduct().getKanbanQuantity()) {
                emailSenderService.sendWarningKanbanEmpty("rafaelchoza78@gmail.com", item.getProduct().getName());
            }

            if (item.getProduct().getQuantity() == 0) {
                emailSenderService.sendWarningProductEmpty("rafaelchoza78@gmail.com", item.getProduct().getName());
            }

            return closedOrderItem;
        }).toList();

        closedOrder.setItems(new ArrayList<>());
        closedOrder.setItems(closedOrderItems);

        ClosedOrder saveClosedOrder = closedOrderRepository.save(closedOrder);
        orderRepository.delete(orderToClose);

        return Optional.of(saveClosedOrder);
    }

    public List<ClosedOrder> getAllClosedOrders() {
        return closedOrderRepository.findAll();
    }

    public ClosedOrder getClosedOrderById(Long orderId) {
        return closedOrderRepository.findByOriginalOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("La orden con el id: " + orderId + " no existe"));
    }

    public ResponseEntity<String> deleteOrderById(Long orderId) {
        Optional<ClosedOrder> optionalClosedOrder = closedOrderRepository.findById(orderId);

        if (optionalClosedOrder.isPresent()) {
            ClosedOrder closedOrder = optionalClosedOrder.get();
            List<ClosedOrderItem> items = closedOrder.getItems();

            // Primero eliminamos los ítems
            closedOrderItemRepository.deleteAll(items);

            // Ahora eliminamos el pedido
            closedOrderRepository.deleteById(orderId);

            return ResponseEntity.ok("Pedido y sus ítems eliminados correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido no encontrado.");
        }
    }

    public Map<String, Long> getProductQuantityMap() {
        List<ClosedOrder> closedOrders = closedOrderRepository.findAll();
        Map<String, Long> productQuantityMap = new HashMap<>();

        for (ClosedOrder order : closedOrders) {
            for (ClosedOrderItem item : order.getItems()) {
                String productName = item.getProduct().getName();
                Long quantity = item.getQuantity();

                productQuantityMap.merge(productName, quantity, Long::sum);
            }
        }
        return productQuantityMap;
    }

    public Long getTotalQuantityOfProductInClosedOrdersBetweenDates(Long productId, LocalDateTime startDate,
            LocalDateTime endDate) {
        List<ClosedOrder> closedOrders = closedOrderRepository.findAll();
        long totalQuantity = 0;

        for (ClosedOrder order : closedOrders) {
            LocalDateTime createdAt = order.getCreatedAt(); // o getClosedAt(), según tu modelo

            if (createdAt != null && !createdAt.isBefore(startDate) && !createdAt.isAfter(endDate)) {
                for (ClosedOrderItem item : order.getItems()) {
                    Product product = item.getProduct();
                    if (product != null && product.getId().equals(productId)) {
                        Long quantity = item.getQuantity();
                        totalQuantity += (quantity != null ? quantity : 0);
                    }
                }
            }
        }

        return totalQuantity;
    }

    public Long getConsumptionByLastMonthByProduct(Long productId) {
        List<ClosedOrder> closedOrders = closedOrderRepository.findAll();
        LocalDateTime fechaLimite = LocalDateTime.now().minusDays(30);
        
        long total = 0;

        for (ClosedOrder order : closedOrders) {
            
            if (order.getCreatedAt().isAfter(fechaLimite)) {
            
                for (ClosedOrderItem item : order.getItems()) {
                    
                    if (item.getProduct().getId().equals(productId)) {
                        total += item.getQuantity();
                    }
                }
            }
        }
        return total;
    }

}
