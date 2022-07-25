package com.main.server.controllers;

import com.main.server.dto.OrganizationDto;
import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.service.interfaces.OrganizationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = {"/api/organization"})
@AllArgsConstructor
public class OrganizationController {

    private OrganizationService organizationService;

    @PostMapping(path = "/")
    public ResponseEntity<OrganizationDto> save(@RequestBody OrganizationDto organizationRequest) throws ResourceAlreadyExistException {
        return new ResponseEntity<>(organizationService.save(organizationRequest), HttpStatus.OK);
    }
}
