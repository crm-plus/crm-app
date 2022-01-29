package com.main.server.dto;

import com.main.server.entity.Sex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private int birthDate;
    private String residentialAddress;
    private Sex sex;
}
