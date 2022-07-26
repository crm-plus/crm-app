package com.main.server.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class Organization {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "number_of_employees", nullable = false, length = 20)
    private int numberOfEmployees;

    @Column(name = "created_by", nullable = false, length = 20)
    private Long createdBy;

    @Column(name = "deleted_by", nullable = false, length = 20)
    private Long deletedBy;
}
