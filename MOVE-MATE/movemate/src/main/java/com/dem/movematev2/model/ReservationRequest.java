package com.dem.movematev2.model;

import lombok.Builder;

import java.util.Objects;

@Builder
public record ReservationRequest(Long errandId) {
    public ReservationRequest {
        Objects.requireNonNull(errandId);
    }
}
