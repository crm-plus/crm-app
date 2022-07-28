package com.main.server.repository;

import com.main.server.model.Organization;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizationRepository extends CrudRepository<Organization, Long> {
    Optional<Organization> findByName(String name);

    List<Organization> findAllByDeletedByFalse();
}
