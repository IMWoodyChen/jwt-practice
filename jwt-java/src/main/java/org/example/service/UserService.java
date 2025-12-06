package org.example.service;

import org.example.model.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private final Map<String, User> users = new HashMap<>();

    public UserService() {
        // Initialize with some demo users
        users.put("admin", new User("admin", "admin123", "ROLE_ADMIN"));
        users.put("user", new User("user", "user123", "ROLE_USER"));
    }

    public User findByUsername(String username) {
        return users.get(username);
    }

    public boolean validateUser(String username, String password) {
        User user = findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}

