package com.main.server.controllers;

import com.main.server.dto.OrganizationDto;
import com.main.server.entity.Organization;
import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.service.interfaces.OrganizationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = {"/api/organizations"})
@AllArgsConstructor
public class OrganizationController {

    private OrganizationService organizationService;

    @PostMapping(path = "/")
    public ResponseEntity<Organization> save(@RequestBody OrganizationDto organization) throws ResourceAlreadyExistException {
        return new ResponseEntity<>(organizationService.save(organization), HttpStatus.OK);
    }

    @GetMapping(path = "/organizations")
    public ResponseEntity<List<Organization>> getAll() {
        return new ResponseEntity<>(organizationService.getAll(), HttpStatus.OK);
    }

    @PutMapping(path = "/organizations/{id}")
    public ResponseEntity<Organization> findById(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(organizationService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/organizations/{id}")
    public ResponseEntity<Organization> delete(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(organizationService.delete(id), HttpStatus.OK);
    }
}
