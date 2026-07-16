package com.example.pixiplay.controller;

import com.example.pixiplay.dto.GameHistoryDTO;
import com.example.pixiplay.service.GameHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/history")
@CrossOrigin(origins = "http://localhost:5173")
public class GameHistoryController {
    @Autowired
    private GameHistoryService gameHistoryService;

    @GetMapping("/{userId}")
    public List<GameHistoryDTO> getHistory(@PathVariable Long userId){
        return gameHistoryService.getHistory(userId);
    }
}
