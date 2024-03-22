package com.dem.movematev2.model.entity;


import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@DiscriminatorValue("2")
@NoArgsConstructor
public class Recipient extends User {

    @OneToMany(mappedBy = "recipient", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reservation> reservationList;

    public Recipient(User parent) {
        super(parent.getEmail(), parent.getUsername(), parent.getTele(), parent.getRole(), parent.getPassword());
    }

}
