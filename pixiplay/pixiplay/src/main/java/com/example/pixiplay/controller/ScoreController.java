package com.example.pixiplay.controller;

import com.example.pixiplay.dto.LeaderboardDTO;
import com.example.pixiplay.entity.Score;
import com.example.pixiplay.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/score")
@CrossOrigin(origins = "http://localhost:5173")
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

    @PostMapping("/{userId}")
    public Score saveScore(@PathVariable Long userId, @RequestBody Score score) {
        return scoreService.saveScore(userId, score);
    }

    @GetMapping("/leaderboard/{gameName}")
    public List<LeaderboardDTO> getLeaderboard(@PathVariable String gameName){
        return scoreService.getLeaderboard(gameName);
    }
}
