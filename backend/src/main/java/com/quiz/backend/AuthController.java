package com.quiz.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {

        Map<String, Object> response = new HashMap<>();

        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            response.put("success", false);
            response.put("message", "User already exists");
            return response;
        }

        userRepo.save(user);
        response.put("success", true);
        response.put("message", "Registered successfully");
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {

        Map<String, Object> response = new HashMap<>();

        return userRepo.findByUsername(user.getUsername())
                .filter(u -> u.getPassword().equals(user.getPassword()))
                .map(u -> {
                    response.put("success", true);
                    response.put("username", u.getUsername());
                    return response;
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "Invalid credentials");
                    return response;
                });
    }
}
