package com.main.server.service;

import com.main.server.exception.ResourceNotFoundException;
import com.main.server.model.User;

public interface AccountService {

    void processRegister(User userRequest) throws ResourceNotFoundException;
}
