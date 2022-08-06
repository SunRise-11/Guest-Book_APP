package com.bt.guestbook.service;

import com.bt.guestbook.model.AppUser;
import com.bt.guestbook.model.Post;
import com.bt.guestbook.repository.PostRepository;
import com.bt.guestbook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public Post savePost(Post post, String username) {
        AppUser user = userRepository.getUserByUsername(username);
        log.info("saving post by {} with id {}", user.getUsername(), user.getId());
        post.setUser(user);
        return postRepository.save(post);
    }

    @Override
    public List<Post> getPosts() {
        log.info("fetching all approved posts");
        return postRepository.findByApprovedTrue();
    }

    @Override
    public Post approvedPost(Long id) {
        Post post = postRepository.getById(id);
        post.setApproved(true);
        return post;
    }

    @Override
    public boolean removePostById(Long id) {
        try {
            postRepository.delete(postRepository.getById(id));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
