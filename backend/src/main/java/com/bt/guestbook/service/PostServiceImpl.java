package com.bt.guestbook.service;

import com.bt.guestbook.model.AppUser;
import com.bt.guestbook.model.Post;
import com.bt.guestbook.repository.PostRepository;
import com.bt.guestbook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.management.RuntimeErrorException;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

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
    public Post getPostById(Long id) {
        return postRepository.getById(id);
    }

    @Override
    public Post approvedPost(Long id) {
        try {
            Post post = postRepository.getById(id);
            post.setApproved(true);
            return post;
        } catch (Exception e) {
            throw new RuntimeException(String.format("post with id %s does not exist", id));
        }
    }

    @Override
    public void removePostById(Long id) {
        Post post = postRepository.getById(id);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = userRepository.getUserByUsername(auth.getPrincipal().toString());

        if (user.isAdmin() || Objects.equals(post.getUser().getId(), user.getId())) {
            try {
                postRepository.delete(postRepository.getById(id));
            } catch (Exception e) {
                throw new RuntimeException("failed to delete post");
            }
        }

        throw new RuntimeException("failed to delete post");
    }

    @Override
    public Post updatePost(Post post) {
        Post storedPost = postRepository.getById(post.getId());

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        AppUser user = userRepository.getUserByUsername(auth.getPrincipal().toString());

        if (user.isAdmin() || Objects.equals(storedPost.getUser().getId(), user.getId())) {
            storedPost.setType(post.getType());
            storedPost.setData(post.getData());
            return storedPost;
        }

        throw new RuntimeException("failed to delete post");
    }

    @Override
    public List<Post> getPendingPosts() {
        return postRepository.findByApprovedFalse();
    }
}
