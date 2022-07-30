package com.main.server.repository;

import com.main.server.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);
}
