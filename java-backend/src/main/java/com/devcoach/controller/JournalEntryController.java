package com.devcoach.controller;

import com.devcoach.entity.JournalEntry;
import com.devcoach.repository.JournalEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class JournalEntryController {

    @Autowired
    private JournalEntryRepository repository;

    @GetMapping
    public List<JournalEntry> getAllLogs() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "date"));
    }

    @PostMapping
    public JournalEntry saveLog(@RequestBody JournalEntry entry) {
        return repository.save(entry);
    }

    @DeleteMapping("/{id}")
    public void deleteLog(@PathVariable String id) {
        repository.deleteById(id);
    }
}
