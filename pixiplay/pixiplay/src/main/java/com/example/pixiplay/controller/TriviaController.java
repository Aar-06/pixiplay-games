package com.example.pixiplay.controller;

import com.example.pixiplay.service.TriviaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trivia")
@CrossOrigin(origins = "http://localhost:5173")
public class TriviaController {
    @Autowired
    private TriviaService triviaService;

    @GetMapping
    public String getQuestion() {
        return triviaService.getQuestion();
    }
}
