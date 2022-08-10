package com.bt.guestbook.api;

import com.bt.guestbook.model.Post;
import com.bt.guestbook.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @RequestMapping(path = "/post", method = GET,produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Post>> getPosts() {
        return ResponseEntity.ok().body(postService.getPosts());
    }

    @GetMapping(path = "/post/pending", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Post>> getPendingPosts() {
        return ResponseEntity.ok().body(postService.getPendingPosts());
    }

    @PostMapping(path = "/post", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        log.info("user {} is creating a post", username);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/post").toUriString());
        return ResponseEntity.created(uri).body(postService.savePost(post, username));
    }

    @DeleteMapping(path = "/post")
    public ResponseEntity<?> deletePost(@RequestBody Long id) {
        postService.removePostById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/post", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Post> updatePost(@RequestBody Post post) {
        Post storedPost = postService.updatePost(post);
        return ResponseEntity.ok().body(storedPost);
    }

    @GetMapping(path = "/post/approve/{id}")
    public ResponseEntity<Post> approvedPost(@PathVariable long id) {
        return ResponseEntity.ok().body(postService.approvedPost(id));
    }
}
