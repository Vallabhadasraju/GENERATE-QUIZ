// package com.quiz.backend;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
// import java.util.*;
// import java.util.stream.Collectors;

// @RestController
// @RequestMapping("/api/results")
// @CrossOrigin(origins = "*")
// public class ResultController {

//     @Autowired
//     private ResultRepository resultRepo;

//     @PostMapping("/submit")
//     public Map<String, Object> submitQuiz(@RequestBody Map<String, Object> payload) {
//         Map<String, Object> response = new HashMap<>();
        
//         try {
//             String username = (String) payload.get("username");
//             int score = Integer.parseInt(payload.get("score").toString());
            
//             new Result(username, score, 10) ; // ✅ FIXED (add totalQuestions)

//             resultRepo.save(result);
            
//             response.put("success", true);
//             response.put("message", "Quiz result saved successfully!");
//             System.out.println("✅ SAVED: " + username + " - Score: " + score);
            
//         } catch (Exception e) {
//             response.put("success", false);
//             response.put("message", "Error: " + e.getMessage());
//             System.out.println("❌ ERROR: " + e.getMessage());
//         }
        
//         return response;
//     }

//     @GetMapping("/ranking")
//     public List<Map<String, Object>> getRanking() {
//         List<Result> results = resultRepo.findAll();
//         return results.stream()
//                 .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore()))
//                 .map(r -> {
//                     Map<String, Object> map = new HashMap<>();
//                     map.put("username", r.getUsername());
//                     map.put("score", r.getScore());
//                     return map;
//                 })
//                 .collect(Collectors.toList());
//     }

//     @GetMapping("/count")
//     public Map<String, Object> getParticipantCount() {
//         Map<String, Object> response = new HashMap<>();
//         long count = resultRepo.count();
//         response.put("count", count);
//         return response;
//     }
// }
package com.quiz.backend;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class ResultController {

    @Autowired
    private ResultRepository resultRepo;

    @PostMapping("/submit")
    public Map<String, Object> submitQuiz(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            String username = (String) payload.get("username");
            int score = Integer.parseInt(payload.get("score").toString());
            int total = Integer.parseInt(payload.get("total").toString());  // ✅ ADD TOTAL
            
            Result result = new Result(username, score, total);  // ✅ FIXED
            resultRepo.save(result);  // ✅ FIXED (was 'result' variable)
            
            response.put("success", true);
            response.put("message", "Quiz result saved successfully!");
            System.out.println("✅ SAVED: " + username + " - Score: " + score);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error: " + e.getMessage());
            System.out.println("❌ ERROR: " + e.getMessage());
        }
        
        return response;
    }

    @GetMapping("/ranking")
    public List<Map<String, Object>> getRanking() {
        List<Result> results = resultRepo.findAll();
        return results.stream()
                .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore()))
                .map(r -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("username", r.getUsername());
                    map.put("score", r.getScore());
                    map.put("total", r.getTotalQuestions());  // ✅ ADD TOTAL
                    return map;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/count")
    public Map<String, Object> getParticipantCount() {
        Map<String, Object> response = new HashMap<>();
        long count = resultRepo.count();
        response.put("count", count);
        return response;
    }
}
