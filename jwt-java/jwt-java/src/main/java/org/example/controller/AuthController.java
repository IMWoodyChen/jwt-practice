package org.example.controller;

import org.example.dto.LoginRequest;
import org.example.dto.LoginResponse;
import org.example.model.User;
import org.example.service.UserService;
import org.example.util.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class AuthController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (userService.validateUser(loginRequest.getUsername(), loginRequest.getPassword())) {
            User user = userService.findByUsername(loginRequest.getUsername());
            String token = jwtTokenProvider.generateToken(user.getUsername(), user.getRole());
            System.out.println("/login is in");
            return ResponseEntity.ok(new LoginResponse(token));
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    @GetMapping("/public/hello")
    public ResponseEntity<String> publicHello() {
        System.out.println("public is in");
        return ResponseEntity.ok("Hello from public endpoint!");
    }

    @GetMapping("/protected/hello")
    public ResponseEntity<String> protectedHello() {
        System.out.println("protected hello is in");
        return ResponseEntity.ok("Hello from protected endpoint! You are authenticated.");
    }
}

