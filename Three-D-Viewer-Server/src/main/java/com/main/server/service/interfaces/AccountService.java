package com.main.server.service.interfaces;

import com.main.server.dto.UserRequest;

public interface AccountService {

    void processRegister(UserRequest userRequest);

    String signIn(String email, String password, String remoteAddr);
}
