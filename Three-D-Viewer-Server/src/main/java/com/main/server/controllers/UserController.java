package com.main.server.controllers;

import com.main.server.dto.UserDTO;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.service.interfaces.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = {"/api/users"})
@AllArgsConstructor
public class UserController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @GetMapping(path = "/")
    public ResponseEntity<List<UserDTO>> getUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}/")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    @PostMapping(path = "/")
    public ResponseEntity<UserDTO> saveUser(@RequestBody UserDTO user) {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }

    @PutMapping(path = "/{id}/")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO user) {
        return new ResponseEntity<>(userService.updateUser(id, user), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}/")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return new ResponseEntity<>("User successfully deleted", HttpStatus.OK);
    }
}
