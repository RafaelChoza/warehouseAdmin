package warehouse.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "closedOrder_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClosedOrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "closed_order_id")   
    private ClosedOrder closedOrder;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Long quantity;
    private Long kanbanQuantity;

    private String forMachine;
}
