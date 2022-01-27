package com.main.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
