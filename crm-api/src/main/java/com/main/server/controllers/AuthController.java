package com.main.server.controllers;

import com.main.server.model.Credential;
import com.main.server.model.RefreshToken;
import com.main.server.model.User;
import com.main.server.security.service.AuthenticationService;
import com.main.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public String authenticate(Credential credential) {
        return authenticationService.authenticate(credential);
    }

    @GetMapping("/refreshToken")
    public String refreshToken(RefreshToken refreshToken) {
        return authenticationService.refreshToken(refreshToken.uuid());
    }

}
