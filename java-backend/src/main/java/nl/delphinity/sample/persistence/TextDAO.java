package nl.delphinity.sample.persistence;

import nl.delphinity.sample.domain.TextObject;
import org.hibernate.Session;
import org.hibernate.Transaction;
import java.util.List;

public class TextDAO {
    public void save(TextObject text) {
        Transaction transaction = null;
        try (Session session = HibernateSessionManager.getSessionFactory().openSession()) {
            transaction = session.beginTransaction();
            session.persist(text);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    public List<TextObject> getAll() {
        try (Session session = HibernateSessionManager.getSessionFactory().openSession()) {
            return session.createQuery("from TextObject", TextObject.class).list();
        }
    }
}
