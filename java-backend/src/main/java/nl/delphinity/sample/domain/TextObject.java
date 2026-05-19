package nl.delphinity.sample.domain;

import jakarta.persistence.*;

@Entity
@Table(name="text")
public class TextObject {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private Double hours;
    @Column(length = 2000) private String tasks;
    @Column(length = 1000) private String good;
    @Column(length = 1000) private String bad;
    @Column(name="evidence_link") private String evidenceLink;
    @Column(name="evidence_desc") private String evidenceDesc;
    @Column(length = 500) private String processes;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public Double getHours() { return hours; }
    public void setHours(Double hours) { this.hours = hours; }
    public String getTasks() { return tasks; }
    public void setTasks(String tasks) { this.tasks = tasks; }
    public String getGood() { return good; }
    public void setGood(String good) { this.good = good; }
    public String getBad() { return bad; }
    public void setBad(String bad) { this.bad = bad; }
    public String getEvidenceLink() { return evidenceLink; }
    public void setEvidenceLink(String evidenceLink) { this.evidenceLink = evidenceLink; }
    public String getEvidenceDesc() { return evidenceDesc; }
    public void setEvidenceDesc(String evidenceDesc) { this.evidenceDesc = evidenceDesc; }
    public String getProcesses() { return processes; }
    public void setProcesses(String processes) { this.processes = processes; }
}
