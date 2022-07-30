package com.main.server.service.impl;

import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.model.Role;
import com.main.server.model.User;
import com.main.server.repository.RoleRepository;
import com.main.server.repository.UserRepository;
import com.main.server.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private static final String USER_NOT_FOUND_BY_ID = "User not found by id: ";

    /**
     * Return user by its id
     *
     * @throws ResourceNotFoundException if such user in not exists
     */
    @Override
    public User getUser(Long id) throws ResourceNotFoundException {
        log.info("Enter getUser() id: {}", id);
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND_BY_ID + id));
    }

    /**
     * Return all user that exists in db
     */
    @Override
    public List<User> getAllUsers() {
        log.info("Enter getAllUsers()");
        return new ArrayList<>(userRepository.getAll());
    }

    /**
     * Save user
     *
     * @return saved user
     * @throws ResourceNotFoundException     if user by current id does not exist
     * @throws ResourceAlreadyExistException if user with the same email already exist
     */
    @Override
    public User saveUser(User user) throws ResourceNotFoundException, ResourceAlreadyExistException {
        log.info("Enter saveUser() user: {}", user);
        User existedUser = userRepository.findByEmail(user.email()).orElse(null);
        if (existedUser != null) {
            throw new ResourceAlreadyExistException(
                    String.format("User with email %s already exist", user.email())
            );
        }
        for (Long roleId : user.roleIds()) {
            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
            user.addRole(role);
        }
        return userRepository.save(user);
    }

    /**
     * Update user
     *
     * @throws ResourceNotFoundException     if user by current id does not exist
     * @throws ResourceAlreadyExistException if user with the same email already exist
     */
    @Override
    public User updateUser(Long id, User userRequest) throws ResourceNotFoundException, ResourceAlreadyExistException {
        log.info("Enter updateUser() id: {}, userRequest: {}", id, userRequest);

        User user = userRepository
                .findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(String.format("User by id %s does not exist", id))
                );
        if (userRepository.findByEmail(userRequest.email()).isPresent()) {
            throw new ResourceAlreadyExistException(
                    String.format("User with email %s already exist", userRequest.email())
            );
        }

        user.firstName(userRequest.firstName());
        user.lastName(userRequest.lastName());
        user.email(userRequest.email());
        user.password(userRequest.password());
        user.birthDate(userRequest.birthDate());
        user.residentialAddress(userRequest.residentialAddress());
        user.sex(userRequest.sex());
        user.clearRoles();

        for (Long roleId : userRequest.roleIds()) {
            Role role = roleRepository
                    .findById(roleId)
                    .orElseThrow(
                            () -> new ResourceNotFoundException("Role not found")
                    );
            user.addRole(role);
        }
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) throws ResourceNotFoundException {
        log.info("Enter deleteUser() id: {}", id);
        User user = userRepository
                .findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                String.format("User with id %s does not exist", id)
                        )
                );
        user.isDeleted(true);
    }
}
