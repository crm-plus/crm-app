package com.main.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity(name = "users")
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(fluent = true)
public class User extends BaseEntity {

    @JsonProperty("firstName")
    @Column(name = "first_name", nullable = false, length = 20)
    private String firstName;

    @JsonProperty("lastName")
    @Column(name = "last_name", nullable = false, length = 20)
    private String lastName;

    //todo - @Pattern("")
    @JsonProperty("email")
    @Column(name = "email", nullable = false, unique = true, length = 45)
    private String email;

    @JsonProperty("password")
    @Column(name = "password", nullable = false, length = 64)
    private String password;

    @JsonProperty("birthDate")
    @Column(name = "birth_date")
    private Date birthDate;

    @JsonProperty("residentialAddress")
    @Column(name = "residential_address")
    private String residentialAddress;

    @JsonProperty("isDeleted")
    @Column(name = "deleted")
    private boolean isDeleted;

    @JsonProperty("sex")
    @Enumerated(EnumType.STRING)
    @Column(name = "sex")
    private Sex sex;

    @JsonIgnore
    @EqualsAndHashCode.Exclude
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "users_roles",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> roles;

    @JsonProperty("roleIds")
    @Transient
    private List<Long> roleIds;

    /*@JsonProperty("roles")
    public List<Role> getRoleNames() {
        return roles.stream().peek(role -> role.setUsers(null)).collect(Collectors.toList());
    }*/

    public void addRole(Role role) {
        if(roles == null) {
            roles = new HashSet<>();
        }
        roles.add(role);
    }

    public void clearRoles() {
        roles = new HashSet<>();
    }
}
