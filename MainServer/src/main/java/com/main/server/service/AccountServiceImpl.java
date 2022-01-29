package com.main.server.service;

import com.main.server.dto.UserRequest;
import com.main.server.entity.User;
import com.main.server.mapper.AccountMapper;
import com.main.server.repository.AccountRepository;
import com.main.server.service.interfaces.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;

    @Override
    public void processRegister(UserRequest userRequest) {
        User newUser = accountMapper.UserRequestToUser(userRequest);
        accountRepository.save(newUser);
    }
}
