package com.bt.guestbook.repository;

import com.bt.guestbook.model.AppUser;
import com.bt.guestbook.model.Post;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@Transactional
class PostRepositoryTest {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByApprovedTrue() {
        AppUser admin = userRepository.findByUsername("admin");
        assertThat(admin).isNotNull();

        Post post = Post.builder()
                .id(1L)
                .user(admin)
                .type("text")
                .data("post data")
                .approved(true)
                .createdAt(1L)
                .updatedAt(1L)
                .build();

        postRepository.save(post);

        List<Post> posts = postRepository.findByApprovedTrue();

        assertThat(posts.isEmpty()).isFalse();
        assertThat(posts.get(0).isApproved()).isEqualTo(true);
    }

    @Test
    void findByApprovedFalse() {
        AppUser admin = userRepository.findByUsername("admin");
        assertThat(admin).isNotNull();

        Post post = Post.builder()
                .id(1L)
                .user(admin)
                .type("text")
                .data("post data")
                .approved(false)
                .createdAt(1L)
                .updatedAt(1L)
                .build();

        postRepository.save(post);

        List<Post> posts = postRepository.findByApprovedFalse();

        assertThat(posts.isEmpty()).isFalse();
        assertThat(posts.get(0).isApproved()).isEqualTo(false);
    }
}