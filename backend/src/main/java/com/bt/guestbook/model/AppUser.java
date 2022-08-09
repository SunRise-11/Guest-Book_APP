package com.bt.guestbook.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
    private @Id
    @GeneratedValue(strategy = AUTO) Long id;
    @Column(unique = true)
    private String username;

    @JsonIgnore
    private String password;

    private boolean isAdmin;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER,
            cascade = CascadeType.REFRESH, orphanRemoval = true)
    private List<Post> posts;
}
