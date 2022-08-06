package com.bt.guestbook.repository;

import com.bt.guestbook.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByApprovedTrue();

    List<Post> findByApprovedFalse();
}
