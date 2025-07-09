package warehouse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import warehouse.dto.ClosedOrder;
import warehouse.dto.ClosedOrderItem;
import warehouse.dto.Order;
import warehouse.repository.ClosedOrderRepository;
import warehouse.repository.OrderRepository;

@Service
public class ClosedOrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ClosedOrderRepository closedOrderRepository;

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

}
