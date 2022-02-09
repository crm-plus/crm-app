package com.main.server.service;

import com.example.mainserver.AbstractSpringBootTests;
import com.example.mainserver.util.TestException;
import com.main.server.controllers.UserController;
import com.main.server.dto.UserDTO;
import com.main.server.entity.Role;
import com.main.server.entity.Sex;
import com.main.server.entity.User;
import com.main.server.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.util.StringUtils;
import org.mockito.Spy;
import org.opentest4j.TestAbortedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;

import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;

import static org.mockito.BDDMockito.given;

class UserServiceImplTest extends AbstractSpringBootTests {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private static final long USER_ID = 1L;

    @Spy
    private final User user = new User();
    @Spy
    private final Role adminRole = new Role();
    @Spy
    private final Role userRole = new Role();

    @BeforeEach
    void setUp() {
        user.setId(USER_ID);
        user.setFirstName("testName");
        user.setLastName("testLastName");
        user.setEmail("test@test.com");
        user.setPassword("test1234");
        user.setResidentialAddress("testAdresss");
        user.setSex(Sex.FEMALE);
        adminRole.setId(1L);
        adminRole.setName("ROLE_ADMIN");
        userRole.setId(2L);
        userRole.setName("ROLE_USER");
        user.addRole(adminRole);
        user.addRole(userRole);
        given(userRepository.findById(1L)).willReturn(Optional.of(user));
    }

    @Test
    public void shouldGetUserDTOByIdIfUserExist() {
        try {
            UserDTO userDTO = userService.getUser(USER_ID);
        } catch (ResourceNotFoundException e) {
            LOGGER.debug(Objects.isNull(e.getMessage()) ?
                    String.format("Can't get user by id %s",USER_ID) :
                    String.format("Can't get user by id %s, because: ",USER_ID, e.getMessage()));
            throw new TestException(e.getMessage(), e);
        }

    }
}