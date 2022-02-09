package com.main.server.service;

import com.main.server.dto.UserRequest;
import com.main.server.entity.Role;
import com.main.server.entity.User;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.mapper.AccountMapper;
import com.main.server.repository.AccountRepository;
import com.main.server.repository.RoleRepository;
import com.main.server.security.JwtTokenProvider;
import com.main.server.service.interfaces.AccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private static final String ROLE_NOT_FOUND_BY_ID = "Role not found by id: ";

    @Override
    public void processRegister(UserRequest userRequest) throws ResourceNotFoundException {
        User newUser = AccountMapper.INSTANCE.UserRequestToUser(userRequest);
        newUser.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        for (Long id : userRequest.getRoleIds()) {
            Role role = roleRepository
                    .findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException(ROLE_NOT_FOUND_BY_ID + id));
            newUser.addRole(role);
        }
        accountRepository.save(newUser);

        log.info("IN processRegister - user: {} successfully registered", newUser);
    }

    @Override
    public String signIn(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            return jwtTokenProvider.createToken(email, accountRepository.findByEmail(email).getRoles());
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
