package nl.delphinity.devcoach.persistence;

import nl.delphinity.devcoach.domain.JournalEntry;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import java.util.List;

public class JournalEntryDAO {

    public static void save(JournalEntry entry) {
        Session session = HibernateSessionManager.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            session.merge(entry); // Use merge to handle potential existing IDs
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    public static List<JournalEntry> findAll() {
        Session session = HibernateSessionManager.getSessionFactory().openSession();
        try {
            Query<JournalEntry> query = session.createQuery("from JournalEntry order by date desc", JournalEntry.class);
            return query.list();
        } finally {
            session.close();
        }
    }

    public static void delete(String id) {
        Session session = HibernateSessionManager.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        try {
            JournalEntry entry = session.get(JournalEntry.class, id);
            if (entry != null) {
                session.remove(entry);
            }
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }
}
