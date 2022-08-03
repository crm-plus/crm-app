package com.main.server.controllers;

import com.main.server.exception.ResourceAlreadyExistException;
import com.main.server.exception.ResourceNotFoundException;
import com.main.server.model.Credential;
import com.main.server.model.User;
import com.main.server.service.UserService;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@Validated
@RestController
@CrossOrigin
@RequestMapping(path = {"/api/users"})
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping(path = "{id}/")
    public ResponseEntity<User> getUserById(@PathVariable @NotNull Long id) throws ResourceNotFoundException {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    @PostMapping(path = "/")
    public ResponseEntity<User> saveUser(@RequestBody @Valid User user) throws ResourceNotFoundException, ResourceAlreadyExistException {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }

    @PutMapping(path = "/{id}/")
    public ResponseEntity<User> updateUser(@PathVariable @NotNull Long id, @RequestBody @Valid User user) throws ResourceNotFoundException, ResourceAlreadyExistException {
        return new ResponseEntity<>(userService.updateUser(id, user), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}/")
    public ResponseEntity<?> deleteUser(@PathVariable @NotNull Long id) throws ResourceNotFoundException {
        userService.deleteUser(id);
        return new ResponseEntity<>("User successfully deleted", HttpStatus.OK);
    }


    @PostMapping("/register")
    public void register(@RequestBody @Valid Credential credential) {
        userService.register(credential);
    }
}
