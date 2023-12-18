package dat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dat.config.ApplicationConfig;
import dat.model.User;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

public class UserControllerTest extends dat.Test {

    private final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Test
    public void testLoginUserSuccess() {
        String bodyJson = String.format("{ \"email\": \"%s\", \"password\": \"%s\" }", "user@mail.dk", "user123");
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/login")
                .then()
                .statusCode(200);
    }

    @Test
    public void testLoginUserInvalidPassword() {
        String bodyJson = String.format("{ \"email\": \"%s\", \"password\": \"%s\" }", "user@mail.dk", "wrongPassword");
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/login")
                .then()
                .statusCode(401);
    }

    @Test
    public void testLoginUserInvalidEmail() {
        String bodyJson = String.format("{ \"email\": \"%s\", \"password\": \"%s\" }", "nonExistentUser@mail.dk", "user123");
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/login")
                .then()
                .statusCode(401);
    }

    @Test
    public void testLoginUsernameSuccess() {
        String bodyJson = String.format("{ \"username\": \"%s\", \"password\": \"%s\" }", "user", "user123");
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/login")
                .then()
                .statusCode(200);
    }

    @Test
    public void testLoginUsernameInvalidPassword() {
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
        User newUser = new User("newUser@mail.dk", "newUser", "newPassword");
        String bodyJson = OBJECT_MAPPER.createObjectNode()
                .put("email", newUser.getEmail())
                .put("username", newUser.getUsername())
                .put("password", newUser.getPassword())
                .toString();
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/register")
                .then()
                .statusCode(201);
    }

    @Test
    public void testCreateUserWithExistingEmail() {
        String bodyJson = String.format("{ \"email\": \"%s\", \"username\": \"%s\", \"password\": \"%s\" }", "user@mail.dk", "user", "newPassword");
        given()
                .body(bodyJson)
                .when()
                .post(ApplicationConfig.getBaseURL() + "/auth/register")
                .then()
                .statusCode(400);
    }
}