package com.main.server.repository;

import com.main.server.model.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository  extends CrudRepository<RefreshToken, Long> {

    RefreshToken findByUuid(String uuid);
}
