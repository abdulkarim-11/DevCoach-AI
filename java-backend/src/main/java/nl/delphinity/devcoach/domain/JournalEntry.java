package nl.delphinity.devcoach.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "journal_entries")
public class JournalEntry {

    @Id
    @Column(length = 50)
    private String id;

    private LocalDate date;
    
    private double hours;
    
    @Column(columnDefinition = "TEXT")
    private String tasks;
    
    @Column(columnDefinition = "TEXT")
    private String good;
    
    @Column(columnDefinition = "TEXT")
    private String bad;
    
    @Column(name = "evidence_link")
    private String evidence_link;
    
    @Column(name = "evidence_desc", columnDefinition = "TEXT")
    private String evidence_desc;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "entry_processes", joinColumns = @JoinColumn(name = "entry_id"))
    @Column(name = "process_name")
    private List<String> processes;

    public JournalEntry() {}

    public JournalEntry(String id, LocalDate date, double hours, String tasks) {
        this.id = id;
        this.date = date;
        this.hours = hours;
        this.tasks = tasks;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public double getHours() { return hours; }
    public void setHours(double hours) { this.hours = hours; }

    public String getTasks() { return tasks; }
    public void setTasks(String tasks) { this.tasks = tasks; }

    public String getGood() { return good; }
    public void setGood(String good) { this.good = good; }

    public String getBad() { return bad; }
    public void setBad(String bad) { this.bad = bad; }

    public String getEvidence_link() { return evidence_link; }
    public void setEvidence_link(String evidence_link) { this.evidence_link = evidence_link; }

    public String getEvidence_desc() { return evidence_desc; }
    public void setEvidence_desc(String evidence_desc) { this.evidence_desc = evidence_desc; }

    public List<String> getProcesses() { return processes; }
    public void setProcesses(List<String> processes) { this.processes = processes; }
}
