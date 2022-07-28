package com.main.server.service;

import com.main.server.exception.ResourceNotFoundException;

public interface AccountService {

    void processRegister(UserRequest userRequest) throws ResourceNotFoundException;
}
