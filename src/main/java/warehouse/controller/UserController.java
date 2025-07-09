package warehouse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import warehouse.dto.User;
import warehouse.service.UserService;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userService.getAllUsers();

        return ResponseEntity.ok(userList);
    }
    
}
