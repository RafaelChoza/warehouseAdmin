package warehouse.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import warehouse.dto.ClosedOrderItem;
import warehouse.repository.ClosedOrderItemRepository;

@Service
public class ClosedOrderItemService {

    @Autowired
    ClosedOrderItemRepository closedOrderItemRepository;

    public List<ClosedOrderItem> getAllClosedOrderItems() {
        return closedOrderItemRepository.findAll();
    }
}
