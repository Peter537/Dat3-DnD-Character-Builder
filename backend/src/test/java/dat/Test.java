package dat;

import dat.config.ApplicationConfig;
import dat.config.HibernateConfig;
import dat.model.Role;
import dat.model.User;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;

import static io.restassured.RestAssured.given;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class Test {

    protected String USER_TOKEN, ADMIN_TOKEN;

    @BeforeAll
    public void beforeAll() {
        HibernateConfig.setTestStatus(true);
        ApplicationConfig.startServer(7777);

        // Create users and roles
        User user = new User("user", "user123");
        User admin = new User("admin", "admin123");
        Role userRole = new Role("user");
        Role adminRole = new Role("admin");
        user.addRole(userRole);
        admin.addRole(adminRole);
        try (EntityManager em = HibernateConfig.getEntityManagerFactory().createEntityManager()) {
            em.getTransaction().begin();
            em.persist(userRole);
            em.persist(adminRole);
            em.persist(user);
            em.persist(admin);
            em.getTransaction().commit();
        }

        // Get tokens
        this.USER_TOKEN = getToken(user.getUsername(), "user123");
        this.ADMIN_TOKEN = getToken(admin.getUsername(), "admin123");
    }

    @AfterAll
    public void afterAll() {
        ApplicationConfig.stopServer();
    }

    private String getToken(String username, String password) {
        String json = String.format("{\"username\": \"%s\", \"password\": \"%s\"}", username, password);
        String token = given()
                .contentType("application/json")
                .body(json)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/login")
                .then()
                .extract()
                .response()
                .body()
                .path("token");

        return "Bearer " + token;
    }
}