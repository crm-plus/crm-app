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

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository organizationRepository;

    @Override
    public Organization save(OrganizationDto organization) throws ResourceAlreadyExistException {
        organizationRepository
                .findByName(organization.getName())
                .orElseThrow(() -> new ResourceAlreadyExistException(
                        String.format("Organization with name %s already exist", organization.getName()))
                );
        Organization result = OrganizationMapper.INSTANCE.dtoToOrganization(organization);
        result.setCreatedAt(LocalDate.now());
        result.setDeletedBy(13L);//Todo
        return organizationRepository.save(result);
    }

    @Override
    public List<Organization> getAll() {
        return organizationRepository.findAll();
    }

    @Override
    public Organization findById(Long id) throws ResourceNotFoundException {
        return findOrganization(id);
    }

    @Override
    public Organization delete(Long id) throws ResourceNotFoundException {
        Organization organization =  findOrganization(id);
        organization.setDeletedBy(13L);
        return organizationRepository.save(organization);
    }

    private Organization findOrganization(Long id) throws ResourceNotFoundException {
        return organizationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                String.format("Organization with id %s not found", id))
        );
    }
}
