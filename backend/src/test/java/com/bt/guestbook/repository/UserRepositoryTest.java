package com.bt.guestbook.repository;

import com.bt.guestbook.model.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void itShouldUserFindByUsername() {
        AppUser user = AppUser.builder()
                .id(1L)
                .username("admin")
                .password("password")
                .isAdmin(true)
                .posts(new ArrayList<>()).build();

        userRepository.save(user);

        AppUser exists = userRepository.findByUsername("admin");

        assertThat(exists.toString()).isEqualTo(user.toString());
    }
}