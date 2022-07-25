package com.main.server.service.interfaces;

import com.main.server.dto.UserRequest;
import com.main.server.exception.ResourceNotFoundException;

public interface AccountService {

    void processRegister(UserRequest userRequest) throws ResourceNotFoundException;
}
