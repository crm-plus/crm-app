package com.main.server.controllers;

import com.main.server.dto.UserRequest;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.service.interfaces.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = {"/api/account"})
@AllArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @RequestMapping("/register")
    public void registration(@RequestBody UserRequest userRequest) throws ResourceNotFoundException {
        accountService.processRegister(userRequest);
    }
}
