package com.main.server.mapper;

import com.main.server.dto.UserRequest;
import com.main.server.entity.User;
import org.mapstruct.Mapper;

@Mapper
public interface AccountMapper {

    User UserRequestToUser(UserRequest userRequest);
}
