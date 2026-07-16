package com.example.pixiplay.service;

import com.example.pixiplay.dto.LeaderboardDTO;
import com.example.pixiplay.entity.GameHistory;
import com.example.pixiplay.entity.Score;
import com.example.pixiplay.entity.User;
import com.example.pixiplay.repository.GameHistoryRepository;
import com.example.pixiplay.repository.ScoreRepository;
import com.example.pixiplay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameHistoryRepository gameHistoryRepository;

    public Score saveScore(Long userId, Score score) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // this is for saving score
        score.setUser(user);
        Score savedScore = scoreRepository.save(score);

        // this is for saving game history
        GameHistory history = new GameHistory();
        history.setUser(user);
        history.setGameName(score.getGameName());
        history.setScore(score.getScore());

        // temporary values which ill replace later after building react
        history.setDuration(0);
        history.setResult("Completed");

        gameHistoryRepository.save(history);

        return savedScore;
    }
    public List<LeaderboardDTO> getLeaderboard(String gameName) {
        List<Score> scores =
                scoreRepository.findByGameNameOrderByScoreDesc(gameName);

        List<LeaderboardDTO> leaderboard = new ArrayList<>();

        int rank = 1;

        for (Score score : scores) {

            leaderboard.add(
                    new LeaderboardDTO(
                            rank,
                            score.getUser().getUsername(),
                            score.getGameName(),
                            score.getScore()
                    )
            );
            rank++;
        }
        return leaderboard;
    }
}

