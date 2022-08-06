package com.bt.guestbook.service;

import com.bt.guestbook.model.Post;

import java.util.List;

public interface PostService {
    Post savePost(Post post, String username);

    List<Post> getPosts();

    Post getPostById(Long id);

    Post approvedPost(Long id);

    void removePostById(Long id);

    Post updatePost(Post post);

    List<Post> getPendingPosts();
}