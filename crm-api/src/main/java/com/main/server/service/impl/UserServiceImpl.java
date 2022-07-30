package com.main.server.service.impl;

import com.main.server.model.Role;
import com.main.server.model.User;
import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.mapper.UserMapper;
import com.main.server.repository.RoleRepository;
import com.main.server.repository.UserRepository;
import com.main.server.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private static final String USER_NOT_FOUND_BY_ID = "User not found by id: ";

    @Override
    public UserDto getUser(Long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND_BY_ID + id));
        return UserMapper.INSTANCE.userToDTO(user);
    }

    @Override
    public List<User> getAllUsers() {
        log.debug("Enter getAllUsers()");
        return new ArrayList<>(userRepository.getAll());
    }

    @Override
    public User saveUser(User user) throws ResourceNotFoundException, ResourceAlreadyExistException {
        User existedUser = userRepository.findByEmail(user.getEmail()).orElse(null);
        if (existedUser != null) {
            throw new ResourceAlreadyExistException(
                    String.format("User with email %s already exist", user.getEmail())
            );
        }
        for (Long roleId : userRequest.getRoleIds()) {
            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
            user.addRole(role);
        }
        return userRepository.save(user);
    }

    @Override
    public UserDto updateUser(Long id, UserRequest userRequest) throws ResourceNotFoundException, ResourceAlreadyExistException {
        User user = userRepository
                .findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(String.format("User by id %s does not exist", id))
                );
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new ResourceAlreadyExistException(
                    String.format("User with email %s already exist", userRequest.getEmail())
            );
        }
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());
        user.setBirthDate(userRequest.getBirthDate());
        user.setResidentialAddress(userRequest.getResidentialAddress());
        user.setSex(userRequest.getSex());
        user.clearRoles();
        for (Long roleId : userRequest.getRoleIds()) {
            Role role = roleRepository
                    .findById(roleId)
                    .orElseThrow(
                            () -> new ResourceNotFoundException("Role not found")
                    );
            user.addRole(role);
        }
        return UserMapper.INSTANCE.userToDTO(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) throws ResourceNotFoundException {
        User user = userRepository
                .findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                String.format("User with id %s does not exist", id)
                        )
                );
        user.setDeleted(true);
    }
}
