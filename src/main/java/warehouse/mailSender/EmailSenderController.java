package warehouse.mailSender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import warehouse.auth.UpdatePasswordRequest;

@RestController
@RequestMapping("/email")
public class EmailSenderController {
    @Autowired
    EmailSenderService emailSenderService;

    @Autowired
    VerificationCodeService verificationCodeService;

    @PostMapping("/send")
    public String sendEmail(@RequestParam String to) {
        emailSenderService.sendVerificationCode(to);
        return("Correo enviado exitosamente");
    }

    @PostMapping("/validate")
    public String validateCode(@RequestParam String email, @RequestParam String inputCode) {
        boolean isValid = verificationCodeService.validateCode(email, inputCode);

        if(isValid) {
            return "Codigo valido, puedes restablecer tu contraseña";
        } else {
            return "Codigo invalido, intentalo de nuevo";
        }
    }

    @PostMapping("/updateCodePassword")
    public ResponseEntity<?> updateCodePassword(@RequestBody UpdatePasswordRequest request) {
        emailSenderService.updatePasswordNoOldPassword(request.getUsername(), request.getNewPassword(), request.getNewPassword2());

        return ResponseEntity.ok("Password actializado mediante codigo");
    }
}
