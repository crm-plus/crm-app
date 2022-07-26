package com.main.server.service.interfaces;

import com.main.server.dto.OrganizationDto;
import com.main.server.exception.ResourceAlreadyExistException;

public interface OrganizationService {

    OrganizationDto save(OrganizationDto organizationRequest) throws ResourceAlreadyExistException;
}
