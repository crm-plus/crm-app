package com.main.server.dto.auth;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Credentials {
    private final String email;
    private final String password;
}
