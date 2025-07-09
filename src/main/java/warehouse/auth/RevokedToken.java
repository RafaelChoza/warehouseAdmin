package warehouse.auth;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name= "revoked_tokens")
@AllArgsConstructor
@NoArgsConstructor
public class RevokedToken {
    @Id
    private String token;
    @SuppressWarnings("unused")
    private LocalDateTime revokedAt;

    public RevokedToken(String token) {
    this.token = token;
    this.revokedAt = LocalDateTime.now(); // Fecha actual por defecto
}


}
