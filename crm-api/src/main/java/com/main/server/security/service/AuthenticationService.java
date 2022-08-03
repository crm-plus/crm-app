package com.main.server.security.service;

import com.main.server.model.Credential;

public interface AuthenticationService {

    String authenticate(Credential credential);

    String refreshToken(String refreshTokenUuid);
}
