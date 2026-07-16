package com.example.pixiplay.service;

import com.example.pixiplay.dto.GameHistoryDTO;
import com.example.pixiplay.entity.GameHistory;
import com.example.pixiplay.repository.GameHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameHistoryService {
    @Autowired
    private GameHistoryRepository gameHistoryRepository;

    public List<GameHistoryDTO> getHistory(Long userId) {

        List<GameHistory> history =
                gameHistoryRepository.findByUserIdOrderByPlayedAtDesc(userId);

        List<GameHistoryDTO> historyList = new ArrayList<>();

        for (GameHistory game : history) {

            historyList.add(
                    new GameHistoryDTO(
                            game.getGameName(),
                            game.getScore(),
                            game.getDuration(),
                            game.getResult(),
                            game.getPlayedAt()
                    )
            );
        }
        return historyList;
    }
}
