// package com.quiz.backend;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "results")
// public class Result {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String username;
//     private int score;

//     public Result() {}

//     public Result(String username, int score) {
//         this.username = username;
//         this.score = score;
//     }

//     public Long getId() { return id; }
//     public String getUsername() { return username; }
//     public int getScore() { return score; }
// }
// package com.quiz.backend;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "results")
// public class Result {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
    
//     private String username;
//     private int score;
    
//     @Column(name = "created_at")
//     private LocalDateTime createdAt = LocalDateTime.now();

//     public Result() {}
    
//     public Result(String username, int score) {
//         this.username = username;
//         this.score = score;
//     }

//     // Getters & Setters
//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }
//     public String getUsername() { return username; }
//     public void setUsername(String username) { this.username = username; }
//     public int getScore() { return score; }
//     public void setScore(int score) { this.score = score; }
//     public LocalDateTime getCreatedAt() { return createdAt; }
//     public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
// }
package com.quiz.backend;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "results")
public class Result {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_id")
    private Long userId;
    
    private int score;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "total_questions", nullable = false)
    private int totalQuestions = 10;
    
    private String username;

    // Default constructor (REQUIRED for Hibernate)
    public Result() {}

    // Constructor with all fields
    public Result(String username, int score, int totalQuestions) {
        this.username = username;
        this.score = score;
        this.totalQuestions = totalQuestions;
    }

    // Getters & Setters (ALL REQUIRED)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
