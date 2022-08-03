package com.main.server.security.service.impl;

import com.main.server.model.Credential;
import com.main.server.repository.RefreshTokenRepository;
import com.main.server.security.JwtTokenProvider;
import com.main.server.security.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JwtAuthenticationServiceImpl implements AuthenticationService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public String authenticate(Credential credential) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    credential.email(),
                    credential.password()
            ));
        } catch (DisabledException e) {
            throw new RuntimeException("USER_DISABLED", e); // TODO add specific exception
        } catch (BadCredentialsException e) {
            throw new RuntimeException("INVALID_CREDENTIALS", e); // TODO add specific exception
        }

        return jwtTokenProvider.createToken(credential.email(), "USER"); //TODO add real role
    }

    @Override
    public String refreshToken(String refreshTokenUuid) {
        return null;
    }
}
