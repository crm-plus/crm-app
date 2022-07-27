package com.main.server.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class Organization extends BaseEntity{

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "created_by", nullable = false, length = 20)
    private Long createdBy;

    @Column(name = "deleted_by", nullable = false, length = 20)
    private Long deletedBy;

    @Column(name = "created_at", nullable = false, length = 20)
    private LocalDate createdAt;

    @Column(name = "updated_at", nullable = false, length = 20)
    private LocalDate updatedAt;

    @Column(name = "is_private", nullable = false, length = 20)
    private Boolean isPrivate;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "members", nullable = false)
    private List<User> members;
}
