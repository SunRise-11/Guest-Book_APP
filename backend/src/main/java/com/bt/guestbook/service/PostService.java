package com.bt.guestbook.service;

import com.bt.guestbook.model.Post;

import java.util.List;

public interface PostService {
    Post savePost(Post post, String username);
    List<Post> getPosts();
    Post approvedPost(Long id);
    boolean removePostById(Long id);

}