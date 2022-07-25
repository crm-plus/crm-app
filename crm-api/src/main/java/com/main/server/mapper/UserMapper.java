package com.main.server.mapper;

import com.main.server.dto.UserDto;
import com.main.server.dto.UserRequest;
import com.main.server.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto userToDTO(User user);

    User dtoToUser(UserDto userDTO);

    User userRequestToUser(UserRequest userRequest);
}
