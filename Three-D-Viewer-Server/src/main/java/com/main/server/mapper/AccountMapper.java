package com.main.server.mapper;

import com.main.server.dto.UserRequest;
import com.main.server.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AccountMapper {

    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);

    User UserRequestToUser(UserRequest userRequest);
}
