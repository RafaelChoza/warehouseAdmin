package warehouse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import warehouse.dto.User;
import warehouse.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userUpdated) {
        User existUser = userRepository.findById(userUpdated.getId())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if(userUpdated != null) {
            existUser.setFirstName(userUpdated.getFirstName());
        }

        if(userUpdated != null) {
            existUser.setLastName(userUpdated.getLastName());
        }

        if(userUpdated != null) {
            existUser.setPassword(userUpdated.getPassword());
        }

        if(userUpdated != null) {
            existUser.setRole(userUpdated.getRole());
        }

        if(userUpdated != null) {
            existUser.setUsername(userUpdated.getUsername());
        }

        return userRepository.save(existUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}
