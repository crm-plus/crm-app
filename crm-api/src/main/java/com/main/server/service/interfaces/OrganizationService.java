package com.main.server.service.interfaces;

import com.main.server.dto.OrganizationDto;
import com.main.server.entity.Organization;
import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;

import java.util.List;

public interface OrganizationService {

    Organization save(OrganizationDto organization) throws ResourceAlreadyExistException;

    List<Organization> getAll();

    Organization findById(Long id) throws ResourceNotFoundException;

    Organization delete(Long id) throws ResourceNotFoundException;
}
