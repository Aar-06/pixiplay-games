package com.example.pixiplay.repository;

import com.example.pixiplay.entity.GameHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface GameHistoryRepository extends JpaRepository<GameHistory, Long>{
    List<GameHistory> findByUserIdOrderByPlayedAtDesc(Long userId);
}
