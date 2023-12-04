package dat.dao;

import dat.config.HibernateConfig;
import dat.exception.AuthorizationException;
import dat.model.Role;
import dat.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;

import java.util.Optional;

public class UserDAO extends DAO<User> {

    private static UserDAO INSTANCE;

    private final DAO<Role> ROLE_DAO = new DAO<>(Role.class, emf);

    private UserDAO(EntityManagerFactory emf) {
        super(User.class, emf);
    }

    public static UserDAO getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new UserDAO(HibernateConfig.getEntityManagerFactory());
        }

        return INSTANCE;
    }

    public User getVerifiedUser(String username, String password) throws AuthorizationException {
        try (EntityManager em = emf.createEntityManager()) {
            em.getTransaction().begin();
            User user = em.find(User.class, username);
            if (user == null || !user.checkPassword(password)) {
                throw new AuthorizationException(401, "Invalid user name or password");
            }

            em.getTransaction().commit();
            return user;
        }
    }

    public User registerUser(String username, String password, String userRole) throws AuthorizationException {
        User user = new User(username, password);
        Optional<Role> role = ROLE_DAO.readById(userRole);
        user.addRole(role.or(() -> Optional.of(createRole(userRole))).get());
        try (EntityManager em = emf.createEntityManager()) {
            em.getTransaction().begin();
            em.persist(user);
            em.getTransaction().commit();
            return user;
        } catch (Exception e) {
            throw new AuthorizationException(400, "Username already exists");
        }
    }

    private Role createRole(String role) {
        Role newRole = new Role(role);
        return ROLE_DAO.create(newRole);
    }

    @Override
    public User create(User user) {
        throw new UnsupportedOperationException("Use register instead");
    }
}