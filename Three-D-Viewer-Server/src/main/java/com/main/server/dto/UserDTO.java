package com.main.server.dto;

import com.main.server.entity.Sex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String residentialAddress;
    private Sex sex;
    private Set<RoleDTO> roles;
}
