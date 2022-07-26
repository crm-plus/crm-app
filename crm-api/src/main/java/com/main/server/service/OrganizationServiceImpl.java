package com.main.server.service;

import com.main.server.dto.OrganizationDto;
import com.main.server.entity.Organization;
import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.mapper.OrganizationMapper;
import com.main.server.repository.OrganizationRepository;
import com.main.server.service.interfaces.OrganizationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class OrganizationServiceImpl implements OrganizationService {

    private OrganizationRepository organizationRepository;

    @Override
    public Organization save(OrganizationDto organizationRequest) throws ResourceAlreadyExistException {
        Organization existedOrganization = organizationRepository.findByName(organizationRequest.getName()).orElse(null);
        if (existedOrganization != null) {
            throw new ResourceAlreadyExistException(
                    String.format("Organization with name %s already exist", organizationRequest.getName())
            );
        }
        Organization organization = OrganizationMapper.INSTANCE.dtoToOrganization(organizationRequest);
        return organizationRepository.save(organization);
    }

    @Override
    public List<Organization> getAll() {
        return organizationRepository.findAll();
    }

    @Override
    public Organization findById(Long id) throws ResourceNotFoundException {
        return organizationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                String.format("Organization with id %s not found", id))
        );
    }

    @Override
    public void delete(Long id) {
        organizationRepository.deleteById(id);
    }
}
