package com.bt.guestbook.repository;

import com.bt.guestbook.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
    AppUser getUserByUsername(String username);
}
