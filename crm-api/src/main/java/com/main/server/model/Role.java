package com.main.server.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import java.util.Set;

@Entity(name = "roles")
@Data
@EqualsAndHashCode(callSuper = false)
public class Role extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "roles")
    private Set<User> users;
}
