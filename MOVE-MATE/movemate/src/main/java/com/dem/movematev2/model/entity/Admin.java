package com.dem.movematev2.model.entity;


import jakarta.persistence.*;

@Entity
@DiscriminatorValue("1")
public class Admin extends User {

    public Admin(){
    }

    public Admin(User parent) {
        super(parent.getEmail(), parent.getUsername(), parent.getTele(), parent.getRole(), parent.getPassword());
    }
}
