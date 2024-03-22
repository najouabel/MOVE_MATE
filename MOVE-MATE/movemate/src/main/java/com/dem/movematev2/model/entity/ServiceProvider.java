package com.dem.movematev2.model.entity;


import com.dem.movematev2.enums.MEANTYPE;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("3")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceProvider extends User {
    @Enumerated(EnumType.STRING)
    private MEANTYPE meantype;

    @OneToMany(mappedBy = "serviceProvider", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Errand> errandList;

    public ServiceProvider(User parent) {
        super(parent.getEmail(), parent.getUsername(), parent.getTele(), parent.getRole(), parent.getPassword());
    }

    public void addErrand(Errand errand){
        if(errandList == null) errandList = new ArrayList<>();
        errandList.add(errand);
    }

}
