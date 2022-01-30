package com.main.server.service;

import com.main.server.dto.UserRequest;
import com.main.server.entity.Role;
import com.main.server.entity.User;
import com.main.server.mapper.AccountMapper;
import com.main.server.repository.AccountRepository;
import com.main.server.repository.RoleRepository;
import com.main.server.service.interfaces.AccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public void processRegister(UserRequest userRequest) {
        User newUser = AccountMapper.INSTANCE.UserRequestToUser(userRequest);
        newUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userRequest.getRoleIds().forEach(id->{
            Role role = roleRepository.findById(id).get();//error!!!
            newUser.addRole(role);
        });
        accountRepository.save(newUser);

        log.info("IN processRegister - user: {} successfully registered", newUser);
    }
}
