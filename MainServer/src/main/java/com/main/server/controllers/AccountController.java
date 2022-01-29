package com.main.server.controllers;

import com.main.server.dto.UserRequest;
import com.main.server.service.interfaces.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = {"/api/account"})
@AllArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @RequestMapping("/register")
    public void registration(UserRequest userRequest) {
        accountService.processRegister(userRequest);
    }
}
