package warehouse.mailSender;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import warehouse.dto.Product;
import warehouse.dto.User;
import warehouse.repository.UserRepository;
import warehouse.service.ProductService;

@Service
public class EmailSenderService {
    @Autowired JavaMailSender mailSender;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductService productService;

    @Autowired
    VerificationCodeService verificationCodeService;

    public String generateVerificationCode() {
        SecureRandom random = new SecureRandom();

        int code = 1000 + random.nextInt(9000);
        return String.valueOf(code);
    }

    public void sendVerificationCode(String toEmail) {
        String code = generateVerificationCode();

        verificationCodeService.saveVerificationCode(toEmail, code);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Tu codigo de verificacion");
        message.setText("Tu codigo para verificar es: " + code);

        mailSender.send(message);
    }

    public void sendWarningKanbanEmpty(String toEmail, String productName) {
        Product product = productService.findProductByName(productName)
            .orElseThrow(() -> new RuntimeException("No se encuentra elprpducto con ese nombre"));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Aviso de Kanban Vacío");
        message.setText("El Kanban del producto "  + product.getName() + " se ha agotado, considere comenzar tramite de compra");

        mailSender.send((message));
    }

    public void sendWarningProductEmpty(String toEmail, String productName) {
        Product product = productService.findProductByName(productName)
            .orElseThrow(() -> new RuntimeException("No se encuentra el producto con ese nombre"));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Aviso de Kanban Vacío");
        message.setText("El producto "  + product.getName() + " está en STOCK OUT, considere comenzar tramite de compra");

        mailSender.send((message));
    }

    public void updatePasswordNoOldPassword(String username, String newPassword, String newPassword2) {
        if (!newPassword.equals(newPassword2)) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario " + username + " no encontrado"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
