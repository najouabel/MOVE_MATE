package com.dem.movematev2.model;

import com.dem.movematev2.enums.MEANTYPE;
import com.dem.movematev2.enums.SERVICE;
import lombok.Builder;

import java.util.Objects;

@Builder
public record ErrandRequest (String _from, String _to, SERVICE service, MEANTYPE meantype, String description) {
    public ErrandRequest {
        Objects.requireNonNull(_from);
        Objects.requireNonNull(_to);
        Objects.requireNonNull(service);
        Objects.requireNonNull(meantype);
    }
}
