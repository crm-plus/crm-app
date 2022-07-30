package com.main.server.controllers;

import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.model.User;
import com.main.server.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
@RequestMapping(path = {"/api/users"})
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping(path = "/")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping(path = "{id}/")
    public ResponseEntity<User> getUserById(@PathVariable Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    @PostMapping(path = "/")
    public ResponseEntity<User> saveUser(@RequestBody User user) throws ResourceNotFoundException, ResourceAlreadyExistException {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }

    @PutMapping(path = "/{id}/")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) throws ResourceNotFoundException, ResourceAlreadyExistException {
        return new ResponseEntity<>(userService.updateUser(id, user), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}/")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) throws ResourceNotFoundException {
        userService.deleteUser(id);
        return new ResponseEntity<>("User successfully deleted", HttpStatus.OK);
    }
}
