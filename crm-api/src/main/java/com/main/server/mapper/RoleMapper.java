package com.main.server.mapper;

import com.main.server.dto.RoleDTO;
import com.main.server.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RoleMapper {
    RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

    RoleDTO roleToDTO(Role role);

    Role roleToUser(RoleDTO roleDTO);
}
