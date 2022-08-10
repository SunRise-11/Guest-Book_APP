package com.bt.guestbook.service;

import com.bt.guestbook.repository.PostRepository;
import com.bt.guestbook.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import static org.mockito.Mockito.verify;

@SpringBootTest
class PostServiceImplTest {

    @Mock
    private PostRepository postRepository;
    @Mock
    private UserRepository userRepository;

    private AutoCloseable autoCloseable;
    private PostService postService;


    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        postService = new PostServiceImpl(postRepository, userRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void savePost() {
    }


    @Test
    void getPostById() {
        long id = 1L;
        postService.getPostById(id);
        verify(postRepository).getById(id);
    }


    @Test
    void getPendingPosts() {
        postService.getPendingPosts();
        verify(postRepository).findByApprovedFalse();
    }
}