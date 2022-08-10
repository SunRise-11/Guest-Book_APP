package com.bt.guestbook.service;

import com.bt.guestbook.model.AppUser;
import com.bt.guestbook.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.ArrayList;
import static org.mockito.Mockito.verify;

@SpringBootTest
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    private AutoCloseable autoCloseable;
    private UserService userService;


    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        userService = new UserServiceImpl(userRepository, new BCryptPasswordEncoder());
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void saveUser() {
        AppUser user = AppUser.builder()
                .id(500L)
                .username("test")
                .password("test")
                .isAdmin(true)
                .posts(new ArrayList<>())
                .build();
        userService.saveUser(user);

        verify(userRepository).save(user);
    }

    @Test
    void getUser() {
        userService.getUser("admin");
        verify(userRepository).findByUsername("admin");
    }

    @Test
    void getUsers() {
        userService.getUsers();
        verify(userRepository).findAll();
    }
}