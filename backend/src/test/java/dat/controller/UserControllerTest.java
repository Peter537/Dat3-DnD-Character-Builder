package dat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dat.config.ApplicationConfig;
import dat.model.Role;
import dat.model.User;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

public class UserControllerTest extends dat.Test {

    private final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Test
    public void testLoginUserSuccess() {
        String bodyJson = String.format("{ \"username\": \"%s\", \"password\": \"%s\" }", "user", "user123");
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/login")
                .then()
                .statusCode(200);
    }

    @Test
    public void testLoginUserInvalidPassword() {
        String bodyJson = String.format("{ \"username\": \"%s\", \"password\": \"%s\" }", "user", "wrongPassword");
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/login")
                .then()
                .statusCode(401);
    }

    @Test
    public void testLoginUserInvalidUsername() {
        String bodyJson = String.format("{ \"username\": \"%s\", \"password\": \"%s\" }", "nonExistentUser", "user123");
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/login")
                .then()
                .statusCode(401);
    }

    @Test
    public void testCreateUserSuccess() {
        User newUser = new User("newUser", "newPassword");
        Role userRole = new Role("user");
        newUser.addRole(userRole);
        String bodyJson = OBJECT_MAPPER.createObjectNode()
                .put("username", newUser.getUsername())
                .put("password", newUser.getPassword())
                .put("role", userRole.getName())
                .toString();
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/register")
                .then()
                .statusCode(201);
    }

    @Test
    public void testCreateUserWithExistingUsername() {
        String bodyJson = String.format("{ \"username\": \"%s\", \"password\": \"%s\", \"role\": \"%s\" }", "user", "newPassword", "user");
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/register")
                .then()
                .statusCode(400);
    }
}