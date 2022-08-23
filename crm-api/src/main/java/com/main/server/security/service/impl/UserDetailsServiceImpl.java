package com.main.server.security.service.impl;

import com.main.server.model.Credential;
import com.main.server.repository.CredentialRepository;
import com.main.server.security.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final CredentialRepository credentialRepository;

    @Autowired
    public UserDetailsServiceImpl(CredentialRepository credentialRepository) {
        this.credentialRepository = credentialRepository;
    }

    public UserDetails loadUserByUsername(String username) {
        Credential credential = credentialRepository.findByEmail(username).get();
        return SecurityUser.fromUser(credential.user());
    }
}
