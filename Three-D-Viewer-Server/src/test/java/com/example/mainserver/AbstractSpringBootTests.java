package com.example.mainserver;

import com.main.server.repository.UserRepository;
import com.main.server.service.UserServiceImpl;
import com.main.server.service.interfaces.UserService;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class AbstractSpringBootTests {
    @Mock
    protected UserRepository userRepository;
    @InjectMocks
    protected UserServiceImpl userService;


}
