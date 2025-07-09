package warehouse.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequest {

    private String username;
    private String oldPassword;
    private String newPassword;
    private String newPassword2; 

}
