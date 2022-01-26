package com.main.server.controllers;

import com.main.server.dto.UserRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = {"/api/users"})
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @GetMapping(path = "/")
    public ResponseEntity<List<UserDTO>> getUsers() {

        return null;
    }

    @GetMapping(path = "/{id}/")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {

        return null;
    }

    @PostMapping(path = "/")
    public ResponseEntity<UserDTO> saveUser(@RequestBody UserRequest user) {
        return null;
    }

    @PutMapping(path = "/{id}/")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserRequest user) {
        return null;
    }

    @DeleteMapping(path = "/{id}/")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return null;
    }
}
