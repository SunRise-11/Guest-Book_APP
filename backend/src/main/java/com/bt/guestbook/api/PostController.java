package com.bt.guestbook.api;

import com.bt.guestbook.model.AppUser;
import com.bt.guestbook.model.Post;
import com.bt.guestbook.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api")

@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/post")
    public ResponseEntity<List<Post>>getPosts() {
        return ResponseEntity.ok().body(postService.getPosts());
    }

    @PostMapping("/post")
    public ResponseEntity<Post>createPost(@RequestBody Post post) {
        return ResponseEntity.ok().body(postService.savePost(post));
    }
}
