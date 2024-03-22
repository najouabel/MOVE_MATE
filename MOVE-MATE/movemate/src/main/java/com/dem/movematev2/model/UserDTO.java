package com.dem.movematev2.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@ToString
public class UserDTO {

    private Long id;
    private String username;
    private String email;
    private String tele;
    private Boolean isEnabled;
    private LocalDateTime createdAt;
}


