package nl.delphinity.devcoach.persistence;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import java.util.Properties;
import java.io.InputStream;

public class HibernateSessionManager {
    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            Configuration configuration = new Configuration();
            
            // Load properties
            Properties props = new Properties();
            try (InputStream is = HibernateSessionManager.class.getResourceAsStream("/hibernate/hibernate.properties")) {
                props.load(is);
            }
            configuration.setProperties(props);
            
            // Load configuration (mappings)
            configuration.configure("/hibernate/hibernate.cfg.xml");
            
            return configuration.buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        getSessionFactory().close();
    }
}
