package com.bt.guestbook.api;

import com.bt.guestbook.model.Post;
import com.bt.guestbook.service.PostService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @GetMapping("/post")
    public ResponseEntity<List<Post>>getPosts() {
        return ResponseEntity.ok().body(postService.getPosts());
    }

    @PostMapping("/post")
    public ResponseEntity<Post>createPost(@RequestBody Post post) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/post").toUriString());
        return ResponseEntity.created(uri).body(postService.savePost(post, SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString()));
    }

    @GetMapping("/post/approve/{id}")
    public ResponseEntity<Post>approvedPost(@PathVariable long id) {
        return ResponseEntity.ok().body(postService.approvedPost(id));
    }
}
