package com.main.server.service.impl;

import com.main.server.model.Organization;
import com.main.server.model.User;
import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.repository.OrganizationRepository;
import com.main.server.service.OrganizationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Service for crud manipulations with entity {@link} Organization
 */
@Service
@AllArgsConstructor
@Slf4j
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository organizationRepository;

    /**
     * Save organization
     *
     * @return saved organization entity
     * @throws ResourceAlreadyExistException if organization with the same name already exist
     */
    @Override
    public Organization save(Organization organization) throws ResourceAlreadyExistException {
        Organization existedOrganization = organizationRepository.findByName(organization.name()).orElse(null);
        if (existedOrganization != null) {
            throw new ResourceAlreadyExistException(
                    String.format("Organization with name %s already exist", organization.name())
            );
        }
        User user = new User(); // TODO add real user
        organization.createdBy(user);
        organization.createdAt(new Date());
        return organizationRepository.save(organization);
    }

    /**
     * Get all organizations which are not deleted
     */
    @Override
    public List<Organization> getAll() {
        return organizationRepository.findAllByDeletedByFalse();
    }

    /**
     * Get organization by id
     *
     * @throws ResourceNotFoundException if organization by current id does not exist
     */
    @Override
    public Organization findById(Long id) throws ResourceNotFoundException {
        return getOrganization(id);
    }

    /**
     * Set Organization deletedBy by current user and save entity
     *
     * @throws ResourceNotFoundException if organization by current id does not exist
     */
    @Override
    public Organization delete(Long id) throws ResourceNotFoundException {
        Organization organization = getOrganization(id);
        User user = new User(); // TODO add real user
        organization.deletedBy(user);
        return organizationRepository.save(organization);
    }

    /**
     * Update organization
     *
     * @throws ResourceNotFoundException     if organization by current id does not exist
     * @throws ResourceAlreadyExistException if organization with the same name already exist
     */
    @Override
    public Organization update(Long id, Organization organization) throws ResourceNotFoundException, ResourceAlreadyExistException {
        Organization existedOrganization = getOrganization(id);

        Organization existedOrganizationWithSameName = organizationRepository.findByName(organization.name()).orElse(null);
        if (existedOrganizationWithSameName != null) {
            throw new ResourceAlreadyExistException(
                    String.format("Organization with name %s already exist", organization.name())
            );
        }

        existedOrganization.name(organization.name());
        existedOrganization.description(organization.description());
        existedOrganization.updatedAt(new Date());

        return organizationRepository.save(existedOrganization);
    }

    /**
     * Find organization by name that is not private and not deleted
     */
    @Override
    public List<Organization> findByName(String name)  {
        return organizationRepository
                .findAllByNameLikeAndDeletedByNullAndIsPrivateFalse(name);
    }

    /**
     * Returns organization by id
     */
    private Organization getOrganization(Long id) throws ResourceNotFoundException {
        return organizationRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                                String.format("Organization with id %d not found", id)
                        )
                );
    }
}
