package com.dem.movematev2.model;

import com.dem.movematev2.enums.MEANTYPE;
import com.dem.movematev2.enums.SERVICE;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReservationDTO {
    private Long id;
    private Long errandId;
    private String from;
    private String to;
    private String recipientEmail;
    private String providerEmail;
    private SERVICE service;
    private MEANTYPE meantype;
    private LocalDateTime createdAt;
}

