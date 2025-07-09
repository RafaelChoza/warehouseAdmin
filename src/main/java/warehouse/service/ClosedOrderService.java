package warehouse.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import warehouse.dto.ClosedOrder;
import warehouse.dto.ClosedOrderItem;
import warehouse.dto.Order;
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
            closedOrderItem.setClosedOrder(closedOrder);
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

}
