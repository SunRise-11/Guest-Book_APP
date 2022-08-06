package com.bt.guestbook.api;

import com.bt.guestbook.model.AppUser;
import com.bt.guestbook.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController

@RequestMapping("/api")

@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<AppUser>>getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user")
    public ResponseEntity<AppUser>createUser(@RequestBody AppUser user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @DeleteMapping("/user")
    public ResponseEntity<String>deleteUser(@RequestBody Long id) {
        boolean deleteUser = userService.deleteUserById(id);

        if (deleteUser) {
            return ResponseEntity.ok().body("user deleted");
        } else {
            return ResponseEntity.internalServerError().body("failed to delete user");
        }
    }
}
