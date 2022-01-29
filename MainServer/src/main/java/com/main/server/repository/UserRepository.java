package com.main.server.repository;

import com.main.server.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {

    @Query("FROM users")
    Set<User> getAll();

}
