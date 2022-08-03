package com.main.server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;


@Entity
@Data
@Accessors(fluent = true)
@EqualsAndHashCode(callSuper = true)
@Table(name = "refresh_tokens")
public class RefreshToken extends BaseEntity {

    @JsonProperty("uuid")
    @Column(name = "uuid", nullable = false, unique = true)
    private String uuid;

    @JsonIgnore
    @Column(name = "createdAt", nullable = false)
    private Date createdAt;

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
