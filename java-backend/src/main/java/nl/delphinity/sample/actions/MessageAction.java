package nl.delphinity.sample.actions;

import com.opensymphony.xwork2.ActionSupport;
import nl.delphinity.sample.domain.TextObject;
import nl.delphinity.sample.persistence.TextDAO;
import java.util.List;

public class MessageAction extends ActionSupport {
    private TextObject textObject;
    private List<TextObject> textObjects;
    private TextDAO dao = new TextDAO();

    public String execute() {
        textObjects = dao.getAll();
        return SUCCESS;
    }

    public String save() {
        if (textObject != null) {
            dao.save(textObject);
        }
        return SUCCESS;
    }

    public TextObject getTextObject() { return textObject; }
    public void setTextObject(TextObject textObject) { this.textObject = textObject; }
    public List<TextObject> getTextObjects() { return textObjects; }
}
