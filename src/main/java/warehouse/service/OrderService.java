package warehouse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import warehouse.dto.Cart;
import warehouse.dto.Order;
import warehouse.dto.OrderItem;
import warehouse.repository.CartRepository;
import warehouse.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CartItemService cartItemService;

    @Autowired
    ProductService productService;

    public Optional<Order> createOrderFromCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Usuario con ese Id no encontrado"));

        Order order = new Order();
        order.setUser(cart.getUser());
        order.setActive(true);

        List<OrderItem> orderItems = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setKanbanQuantity(cartItem.getKanbanQuantity());
            orderItem.setForMachine(cartItem.getForMachine());
            orderItem.setOrder(order);
            return orderItem;
        }).toList();

        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        cartItemService.deleteAllItems();

        cart.getItems().clear();
        cartRepository.save(cart);

        return Optional.of(savedOrder);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> setOrderAsDelivered(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe la orden con el id: " + id));

        

        if(!order.isDelivered()) {
            for(OrderItem item: order.getItems()) {
                productService.decreaseQuantityProduct(item.getId(), item.getQuantity());
                System.out.println(item.getId());
                System.out.println(item.getQuantity());
            }
        }

        order.setDelivered(true);
        
        orderRepository.save(order);

        return Optional.of(order);
    }

    public void deleteOrderById(Long id) {
    Optional<Order> orderToDelete = orderRepository.findById(id);

    if (orderToDelete.isPresent()) {
        orderRepository.deleteById(id);

    } else {
        throw new RuntimeException("No se encontró la Orden con el ID indicado");
    }
}


}
