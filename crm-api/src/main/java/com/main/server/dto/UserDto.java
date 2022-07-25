package com.main.server.dto;

import com.main.server.entity.Sex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String firstName;
    private String lastName;
    private String email;
    private Date birthDate;
    private String residentialAddress;
    private boolean isDeleted;
    private Sex sex;
    private Set<RoleDto> roles;
}
