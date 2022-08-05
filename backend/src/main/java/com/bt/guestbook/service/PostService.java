package com.bt.guestbook.service;

import com.bt.guestbook.model.AppUser;
import com.bt.guestbook.model.Post;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostService {
    Post savePost(Post post);
    List<Post> getPosts();
    Post approvedPost(Long id);
    boolean removePostById(Long id);

}