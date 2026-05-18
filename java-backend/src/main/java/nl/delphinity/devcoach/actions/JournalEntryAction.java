package nl.delphinity.devcoach.actions;

import com.opensymphony.xwork2.ActionSupport;
import nl.delphinity.devcoach.domain.JournalEntry;
import nl.delphinity.devcoach.persistence.JournalEntryDAO;
import org.apache.struts2.interceptor.parameter.StrutsParameter;
import java.util.List;

public class JournalEntryAction extends ActionSupport {

    private List<JournalEntry> logs;
    private JournalEntry log;
    private String logId;
    private String message;

    // Output for JSON
    public List<JournalEntry> getLogs() { return logs; }
    public JournalEntry getLog() { return log; }
    public String getMessage() { return message; }

    // Input for Delete
    @StrutsParameter
    public void setLogId(String logId) { this.logId = logId; }

    // Input for Save
    @StrutsParameter(depth = 1)
    public void setLog(JournalEntry log) { this.log = log; }

    public String getAllLogs() {
        this.logs = JournalEntryDAO.findAll();
        return SUCCESS;
    }

    public String saveLog() {
        if (log != null) {
            JournalEntryDAO.save(log);
            this.message = "Saved!";
            return SUCCESS;
        }
        this.message = "No data provided";
        return ERROR;
    }

    public String deleteLog() {
        if (logId != null) {
            JournalEntryDAO.delete(logId);
            this.message = "Deleted!";
            return SUCCESS;
        }
        return ERROR;
    }
}
