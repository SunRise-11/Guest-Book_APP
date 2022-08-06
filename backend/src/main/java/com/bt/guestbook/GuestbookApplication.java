package com.bt.guestbook;

import com.bt.guestbook.model.AppUser;
import com.bt.guestbook.model.Post;
import com.bt.guestbook.service.PostService;
import com.bt.guestbook.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class GuestbookApplication {

	public static void main(String[] args) {
		SpringApplication.run(GuestbookApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run (UserService userService, PostService postService) {
		return args -> {
			AppUser admin = new AppUser(null, "admin", "password", true, new ArrayList<>());
			userService.saveUser(admin);
			postService.savePost(new Post(null, null, "text", "this is a post", true), "admin");
			postService.savePost(new Post(null, null, "text", "this is a post", true), "admin");
			postService.savePost(new Post(null, null, "text", "this is a post", true), "admin");
			postService.savePost(new Post(null, null, "text", "this is a post", false), "admin");
			postService.savePost(new Post(null, null, "text", "this is a post that is not approved", false), "admin");
		};
	}

}
