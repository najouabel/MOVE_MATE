package com.dem.movematev2.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.dem.movematev2.enums.UserRole;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="user_role",
        discriminatorType = DiscriminatorType.STRING)
public class User implements UserDetails, Serializable {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String username;
    private String tele;
    private UserRole role;

    @JsonIgnore
    private String password;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @JsonIgnore
    private boolean isEnabled = true;
    @JsonIgnore
    private boolean isAccountExpired = false;
    @JsonIgnore
    private boolean isCredentialsExpired = false;
    @JsonIgnore
    private boolean isLocked = false;



    @JsonIgnore
    @Transient
    private List<SimpleGrantedAuthority> grantedAuthorityList;

    public User(){
    }

    public User(Long id,String email, String username, String tele, UserRole role, String password) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.tele = tele;
        this.role = role;
        this.password = password;
        this.getAuthorities();
    }

    public User(String email, String username, String tele, UserRole role, String password) {
        this.email = email;
        this.username = username;
        this.tele = tele;
        this.role = role;
        this.password = password;
        this.getAuthorities();
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(role != null){
            grantedAuthorityList = new ArrayList<>();
            for(String role : role.toString().split(",")){
                this.grantedAuthorityList.add(new SimpleGrantedAuthority(role));
            }
        }
        return grantedAuthorityList;
    }

    public void setGrantedAuthorityList(List<SimpleGrantedAuthority> grantedAuthorityList) {
        this.grantedAuthorityList = grantedAuthorityList;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !isAccountExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !isCredentialsExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTele() {
        return tele;
    }

    public void setTele(String tele) {
        this.tele = tele;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }


    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
