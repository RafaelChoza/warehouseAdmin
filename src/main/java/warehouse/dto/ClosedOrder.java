package warehouse.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "closed_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClosedOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long originalOrderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({ "closedOrder" })
    private User user;

    @OneToMany(mappedBy = "closedOrder", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnoreProperties({ "closedOrder" })
    private List<ClosedOrderItem> items;

    private Boolean active = true;

    private Boolean delivered = true;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
