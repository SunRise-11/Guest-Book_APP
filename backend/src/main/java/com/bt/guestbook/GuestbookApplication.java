package com.bt.guestbook;

import com.bt.guestbook.model.AppUser;
import com.bt.guestbook.model.Post;
import com.bt.guestbook.security.TokenHandler;
import com.bt.guestbook.service.PostService;
import com.bt.guestbook.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;

@SpringBootApplication
public class GuestbookApplication {

    public static void main(String[] args) {
        SpringApplication.run(GuestbookApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000").allowedMethods("GET", "OPTIONS", "POST", "PUT", "DELETE");
            }
        };
    }

    @Bean
    TokenHandler tokenHandler() { return  new TokenHandler(); }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run(UserService userService, PostService postService) {
        return args -> {
            AppUser admin = new AppUser(null, "admin", "password", true, new ArrayList<>());
            userService.saveUser(admin);

            AppUser user = new AppUser(null, "user", "password", false, new ArrayList<>());
            userService.saveUser(user);

            AppUser user2 = new AppUser(null, "user2", "password", false, new ArrayList<>());
            userService.saveUser(user2);

            postService.savePost(new Post(null, null, "text", "this is a post", true, null,null), "admin");
            postService.savePost(new Post(null, null, "text", "this is a post", true, null,null), "admin");
            postService.savePost(new Post(null, null, "text", "this is a post", true, null,null), "user");

            postService.savePost(new Post(null, null, "text", "this is a post that is not approved", false, null,null), "user");
            postService.savePost(new Post(null, null, "text", "this is a post that is not approved", false, null,null), "admin");
        };
    }

}
