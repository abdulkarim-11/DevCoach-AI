package nl.delphinity.sample.persistence;

import nl.delphinity.sample.domain.TextObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
import java.util.List;

public class TextDAO {
    public void save(TextObject text) {
        try (Session session = HibernateSessionManager.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.merge(text);
            transaction.commit();
        }
    }

    public List<TextObject> getAll() {
        try (Session session = HibernateSessionManager.getSessionFactory().openSession()) {
            return session.createQuery("from TextObject", TextObject.class).list();
        }
    }

    public void delete(Long id) {
        try (Session session = HibernateSessionManager.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            TextObject text = session.get(TextObject.class, id);
            if (text != null) {
                session.remove(text);
            }
            transaction.commit();
        }
    }
}
