package com.example.pixiplay.controller;

import com.example.pixiplay.entity.User;
import com.example.pixiplay.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        User savedUser = userService.register(user);
        savedUser.setPassword(null);
        return savedUser;
    }
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User loggedUser = userService.login(
                user.getEmail(),
                user.getPassword());
        loggedUser.setPassword(null);
        return loggedUser;
    }
}
