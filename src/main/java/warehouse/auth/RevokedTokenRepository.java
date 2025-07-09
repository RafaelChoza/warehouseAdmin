package warehouse.auth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RevokedTokenRepository extends JpaRepository<RevokedToken, String> {
    boolean existsByToken(String token);
}
