package com.main.server.service.interfaces;

import com.main.server.dto.UserDto;
import com.main.server.dto.UserRequest;
import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;

import java.util.List;

public interface UserService {

    UserDto getUser(Long id) throws ResourceNotFoundException;

    List<UserDto> getAllUsers();

    UserDto saveUser(UserRequest user) throws ResourceNotFoundException, ResourceAlreadyExistException;

    UserDto updateUser(Long id, UserRequest user) throws ResourceNotFoundException, ResourceAlreadyExistException;

    void deleteUser(Long id) throws ResourceNotFoundException;
}
