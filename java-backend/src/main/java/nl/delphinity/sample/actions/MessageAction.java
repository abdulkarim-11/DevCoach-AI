package nl.delphinity.sample.actions;

import org.apache.struts2.ActionSupport;
import org.apache.struts2.interceptor.parameter.StrutsParameter;
import nl.delphinity.sample.domain.TextObject;
import nl.delphinity.sample.persistence.TextDAO;
import java.util.List;

public class MessageAction extends ActionSupport {
    private TextObject textObject = new TextObject();
    private List<TextObject> textObjects;
    private TextDAO dao = new TextDAO();
    private Long id;

    @Override
    public String execute() {
        textObjects = dao.getAll();
        return SUCCESS;
    }

    public String saveText() {
        dao.save(textObject);
        return SUCCESS;
    }

    public String deleteText() {
        if (id != null) {
            dao.delete(id);
        }
        return SUCCESS;
    }

    public TextObject getTextObject() { return textObject; }
    
    @StrutsParameter(depth = 1)
    public void setTextObject(TextObject textObject) { this.textObject = textObject; }

    public List<TextObject> getTextObjects() { return textObjects; }

    public Long getId() { return id; }
    
    @StrutsParameter
    public void setId(Long id) { this.id = id; }
}
