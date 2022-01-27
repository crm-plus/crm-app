package com.main.server.mapper;

@Mapper
public interface RoleMapper {
    RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

    RoleDTO roleToDTO(Role);

    User roleToUser(RoleDTO);
}
