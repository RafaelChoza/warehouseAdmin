package warehouse.dto;

public enum Role {
    ADMIN(1),
    USER(2),
    SUPERUSER(3); // ← Corregido aquí

    private final int id;

    Role(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
