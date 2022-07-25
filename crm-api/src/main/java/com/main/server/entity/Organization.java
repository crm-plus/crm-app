package com.main.server.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "organization")
@Data
@EqualsAndHashCode(callSuper = false)
public class Organization {

    @Id
    private Long id;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "number_of_employees", nullable = false, length = 20)
    private int numberOfEmployees;
}
