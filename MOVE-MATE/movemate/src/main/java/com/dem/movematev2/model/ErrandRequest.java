package com.dem.movematev2.model;

import com.dem.movematev2.enums.MEANTYPE;
import com.dem.movematev2.enums.SERVICE;
import lombok.Builder;

import java.util.Objects;

public record ErrandRequest (String _from, String _to, SERVICE service, MEANTYPE meantype, String description) {
}
