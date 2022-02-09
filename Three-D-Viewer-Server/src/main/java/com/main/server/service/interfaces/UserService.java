package com.main.server.service.interfaces;

import com.main.server.dto.UserDTO;
import com.main.server.dto.UserRequest;
import com.main.server.exception.ResourceNotFoundException;

import java.util.List;

public interface UserService {

    UserDTO getUser(Long id) throws ResourceNotFoundException;

    List<UserDTO>  getAllUsers();

    UserDTO saveUser(UserRequest user) throws ResourceNotFoundException;

    UserDTO updateUser(Long id, UserDTO user);

    void deleteUser(Long id);
}
