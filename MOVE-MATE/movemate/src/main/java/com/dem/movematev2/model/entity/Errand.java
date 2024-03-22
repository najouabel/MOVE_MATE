package com.dem.movematev2.model.entity;

import com.dem.movematev2.enums.MEANTYPE;
import com.dem.movematev2.enums.SERVICE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="errand_type",
        discriminatorType = DiscriminatorType.STRING)
public class Errand {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String _from;
    private String _to;

    @Enumerated(EnumType.STRING)
    private SERVICE service;

    @Enumerated(EnumType.STRING)
    private MEANTYPE meantype;

    private LocalDateTime date;


    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(length = 512)
    private String description;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "provider_id", referencedColumnName = "id")
    private ServiceProvider serviceProvider;

}
