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
import java.util.Date;

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
            userService.saveUser(new AppUser(100L, "admin", "password", true, new ArrayList<>()));
            userService.saveUser(new AppUser(102L, "john.doe", "password", false, new ArrayList<>()));
            userService.saveUser(new AppUser(103L, "jane.smith", "password", false, new ArrayList<>()));
            userService.saveUser(new AppUser(103L, "ella.gale", "password", false, new ArrayList<>()));
            userService.saveUser(new AppUser(103L, "ben.slater", "password", false, new ArrayList<>()));
            userService.saveUser(new AppUser(103L, "lisa.perez", "password", false, new ArrayList<>()));

            Long date = new Date(System.currentTimeMillis()).getTime();

            postService.savePost(new Post(null, null, "text", "Overall, I had a great experience with the room; staff was incredibly helpful, and the amenities were great. The room was wonderful, clean, and perfect to celebrate a birthday weekend.", true, date,date), "ella.gale");
            postService.savePost(new Post(null, null, "text", "Excellent property and very convenient to USC activities. Front desk staff is extremely efficient, pleasant and helpful. Property is clean and has a fantastic old time charm.", true, date,date), "ben.slater");
            postService.savePost(new Post(null, null, "text", "The best hotel I’ve ever been privileged enough to stay at. Gorgeous building, and it only gets more breathtaking when you walk in. High quality rooms (there was even a tv by the shower), and high quality service. Also, they are one of few hotels that allow people under 21 to book a reservation.", true, date,date), "john.doe");
            postService.savePost(new Post(null, null, "text", "Took advantage of the downtown location to walk to dinner, check out a couple galleries, and have drinks. It was great. Service top notch as always. Bed comfort can not be beat.", false, date,date), "jane.smith");
            postService.savePost(new Post(null, null, "text", "They were extremely accommodating and allowed us to check in early at like 10am. We got to hotel super early and I didn’t wanna wait. So this was a big plus. The sevice was exceptional as well. Would definitely send a friend there.", false, date,date), "lisa.perez");
        };
    }

}
