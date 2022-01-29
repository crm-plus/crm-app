package com.main.server.mapper;

import com.main.server.dto.UserDTO;
import com.main.server.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO userToDTO(User user);

    User dtoToUser(UserDTO userDTO);
}
