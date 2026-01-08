package com.quiz.backend;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin("*")
public class QuizController {

    @GetMapping
    public List<Map<String, Object>> getQuiz() {

        List<Map<String, Object>> quiz = new ArrayList<>();

        quiz.add(Map.of(
                "q", "HTML stands for?",
                "options", List.of(
                        "HyperText Markup Language",
                        "Home Tool Markup Language",
                        "Hyperlinks and Text Markup Language",
                        "Hyper Tool Multi Language"
                ),
                "answer", 0
        ));

        quiz.add(Map.of(
                "q", "CSS stands for?",
                "options", List.of(
                        "Creative Style Sheets",
                        "Cascading Style Sheets",
                        "Colorful Style Sheets",
                        "Computer Style Sheets"
                ),
                "answer", 1
        ));

        quiz.add(Map.of(
                "q", "JavaScript is a?",
                "options", List.of(
                        "Programming Language",
                        "Markup Language",
                        "Styling Language",
                        "Database"
                ),
                "answer", 0
        ));

        quiz.add(Map.of(
                "q", "React is a?",
                "options", List.of(
                        "Framework",
                        "Library",
                        "Database",
                        "Language"
                ),
                "answer", 1
        ));

        quiz.add(Map.of(
                "q", "Which protocol is used in REST API?",
                "options", List.of(
                        "HTTP",
                        "FTP",
                        "SMTP",
                        "TCP"
                ),
                "answer", 0
        ));

        quiz.add(Map.of(
                "q", "JSON stands for?",
                "options", List.of(
                        "JavaScript Object Notation",
                        "Java Standard Object Notation",
                        "Java Source Object Notation",
                        "None of the above"
                ),
                "answer", 0
        ));

        quiz.add(Map.of(
                "q", "Git is used for?",
                "options", List.of(
                        "Version Control",
                        "Text Editing",
                        "Database Management",
                        "Code Execution"
                ),
                "answer", 0
        ));

        quiz.add(Map.of(
                "q", "Which is a backend framework?",
                "options", List.of(
                        "Spring Boot",
                        "React",
                        "HTML",
                        "CSS"
                ),
                "answer", 0
        ));

        quiz.add(Map.of(
                "q", "MySQL is a?",
                "options", List.of(
                        "Programming Language",
                        "Database",
                        "Framework",
                        "Browser"
                ),
                "answer", 1
        ));

        quiz.add(Map.of(
                "q", "API stands for?",
                "options", List.of(
                        "Application Programming Interface",
                        "Advanced Programming Interface",
                        "Application Process Interface",
                        "Applied Programming Instruction"
                ),
                "answer", 0
        ));

        return quiz;
    }
}
