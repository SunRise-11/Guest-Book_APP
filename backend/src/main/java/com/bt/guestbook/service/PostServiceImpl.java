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
    public Post savePost(Post post) {
        AppUser user = userRepository.getById(post.getUser().getId());

        Post newPost = new Post();
        newPost.setUser(user);
        newPost.setData(post.getData());
        newPost.setApproved(false);
        newPost.setType(post.getType());

        log.info("saving post by {}", user.getUsername());
        return postRepository.save(newPost);
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
