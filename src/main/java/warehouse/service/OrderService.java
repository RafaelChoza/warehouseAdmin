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
            orderItem.setForMachine(cartItem.getForMachine());
            orderItem.setOrder(order);
            return orderItem;
        }).toList();

        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        cart.getItems().clear();
        cartRepository.save(cart);

        return Optional.of(savedOrder);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

}
