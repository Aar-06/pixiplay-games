package com.example.pixiplay.repository;

import com.example.pixiplay.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long>{
    List<Score> findByUserId(Long userId);
    List<Score> findByGameNameOrderByScoreDesc(String gameName);
}
