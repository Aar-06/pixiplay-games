package com.example.pixiplay.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String gameName;

    @Column(nullable = false)
    private Integer score;

    private LocalDateTime playedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"scores", "gameHistory"})
    private User user;

    @PrePersist
    public void onCreate() {
        playedAt = LocalDateTime.now();
    }
}
