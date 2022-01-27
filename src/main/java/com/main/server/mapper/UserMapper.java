package com.main.server.mapper;

import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO usertoDTO(User);

    User dtoToUser(UserDTO);
}
