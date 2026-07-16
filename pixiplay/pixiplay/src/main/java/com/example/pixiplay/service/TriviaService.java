package com.example.pixiplay.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TriviaService {
    @Autowired
    private RestTemplate restTemplate;

    private final String URL = "https://opentdb.com/api.php?amount=1&type=multiple";

    public String getQuestion() {
        return restTemplate.getForObject(URL, String.class);
    }
}
