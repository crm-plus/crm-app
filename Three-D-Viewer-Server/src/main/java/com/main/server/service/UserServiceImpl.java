package com.main.server.service;

import com.main.server.dto.UserDTO;
import com.main.server.dto.UserRequest;
import com.main.server.entity.Role;
import com.main.server.entity.User;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.mapper.UserMapper;
import com.main.server.repository.RoleRepository;
import com.main.server.repository.UserRepository;
import com.main.server.service.interfaces.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private static final String USER_NOT_FOUND_BY_ID = "User not found by id: ";

    @Override
    public UserDTO getUser(Long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(USER_NOT_FOUND_BY_ID + id));
        return UserMapper.INSTANCE.userToDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.getAll().stream()
                .map(UserMapper.INSTANCE::userToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO saveUser(UserRequest userRequest) throws ResourceNotFoundException {
        User user = UserMapper.INSTANCE.userRequestToUser(userRequest);
        for (Long roleId : userRequest.getRoleIds()) {
            Role role = roleRepository.findById(roleId).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
            user.addRole(role);
        }
        return UserMapper.INSTANCE.userToDTO(userRepository.save(user));
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userData) {
        User user = UserMapper.INSTANCE.dtoToUser(userData);
        user.setId(id);
        return UserMapper.INSTANCE.userToDTO(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
