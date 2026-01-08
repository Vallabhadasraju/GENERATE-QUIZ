// package com.quiz.backend;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;
// import java.util.stream.Collectors;

// @RestController
// @RequestMapping("/api/score")
// @CrossOrigin(origins = "*")
// public class ScoreController {

//     @Autowired
//     private ResultRepository resultRepo;

//     @PostMapping
//     public void saveScore(@RequestBody Result result) {
//         System.out.println("✅ SAVING: " + result.getUsername() + " - Score: " + result.getScore());
//         resultRepo.save(result);
//         System.out.println("✅ SAVED to database!");
//     }

//     @GetMapping("/leaderboard")
//     public List<Result> leaderboard() {
//         return resultRepo.findAll()
//                 .stream()
//                 .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore()))
//                 .limit(5)
//                 .collect(Collectors.toList());
//     }

//     @GetMapping("/count")
//     public long getCount() {
//         return resultRepo.count();
//     }
// }
package com.quiz.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/score")
@CrossOrigin(origins = "*")
public class ScoreController {

    @Autowired
    private ResultRepository resultRepo;

    @PostMapping
    public void saveScore(@RequestBody Map<String, Object> payload) {
        try {
            String username = (String) payload.get("username");
            int score = Integer.parseInt(payload.get("score").toString());
            int totalQuestions = payload.containsKey("total_questions") ? 
                Integer.parseInt(payload.get("total_questions").toString()) : 10;

            Result result = new Result(username, score, totalQuestions);
            result.setCompletedAt(LocalDateTime.now());
            
            System.out.println("✅ SAVING: " + username + " - Score: " + score + "/" + totalQuestions);
            resultRepo.save(result);
            System.out.println("✅ SAVED to database!");
            
        } catch (Exception e) {
            System.out.println("❌ ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @GetMapping("/leaderboard")
    public List<Result> leaderboard() {
        return resultRepo.findAll()
                .stream()
                .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore()))
                .limit(5)
                .collect(Collectors.toList());
    }

    @GetMapping("/count")
    public long getCount() {
        return resultRepo.count();
    }
}
