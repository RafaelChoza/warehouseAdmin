package warehouse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import warehouse.repository.OrderItemRepository;
import warehouse.dto.OrderItem;

@Service
public class OrderItemService {

    @Autowired
    OrderItemRepository orderItemRepository;

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public Optional<OrderItem> updateOrderItem(Long id, OrderItem orderItemUpdated) {
        OrderItem orderItemToUpdate = orderItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("No existe el item con el id: " + id));

        orderItemToUpdate.setProduct(orderItemUpdated.getProduct());
        orderItemToUpdate.setQuantity(orderItemUpdated.getQuantity());
        orderItemToUpdate.setForMachine(orderItemUpdated.getForMachine());

        orderItemRepository.save(orderItemToUpdate);

        return Optional.of(orderItemToUpdate);
        
    }
}
