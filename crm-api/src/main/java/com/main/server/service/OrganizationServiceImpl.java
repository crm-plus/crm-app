package com.main.server.service;

import com.main.server.dto.OrganizationDto;
import com.main.server.entity.Organization;
import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.mapper.OrganizationMapper;
import com.main.server.repository.OrganizationRepository;
import com.main.server.service.interfaces.OrganizationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class OrganizationServiceImpl implements OrganizationService {

    private OrganizationRepository organizationRepository;

    @Override
    public OrganizationDto save(OrganizationDto organizationRequest) throws ResourceAlreadyExistException {
        Organization existedOrganization = organizationRepository.findByName(organizationRequest.getName()).orElse(null);
        if (existedOrganization != null) {
            throw new ResourceAlreadyExistException(
                    String.format("Organization with name %s already exist", organizationRequest.getName())
            );
        }
        Organization organization = OrganizationMapper.INSTANCE.dtoToOrganization(organizationRequest);
        return OrganizationMapper.INSTANCE.organizationToDto(organizationRepository.save(organization));
    }
}
