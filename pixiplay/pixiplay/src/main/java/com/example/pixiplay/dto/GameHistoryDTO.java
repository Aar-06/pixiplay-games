package com.example.pixiplay.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class GameHistoryDTO {

    private String gameName;
    private Integer score;
    private Integer duration;
    private String result;
    private LocalDateTime playedAt;

}