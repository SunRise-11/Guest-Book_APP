package com.bt.guestbook.service;

import com.bt.guestbook.model.AppUser;

import java.util.List;

public interface UserService {
    AppUser saveUser(AppUser user);
    AppUser getUser(String username);
    List<AppUser> getUsers();
}
