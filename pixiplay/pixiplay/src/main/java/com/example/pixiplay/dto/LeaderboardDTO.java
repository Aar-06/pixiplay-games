package com.example.pixiplay.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LeaderboardDTO {
    private Integer rank;
    private String username;
    private String gameName;
    private Integer score;
}
