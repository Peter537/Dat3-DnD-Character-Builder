package dat.dao;

import dat.exception.AuthorizationException;
import dat.model.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserDAOTest extends dat.Test {

    @Test
    void testGetVerifiedUser() {
        try {
            User verifiedUser = UserDAO.getInstance().getVerifiedUser("user", "user123");
            assertEquals("user", verifiedUser.getUsername());
        } catch (AuthorizationException e) {
            fail("AuthorizationException should not be thrown.");
        }
    }

    @Test
    void testGetVerifiedUserInvalidPassword() {
        assertThrows(AuthorizationException.class, () -> {
            UserDAO.getInstance().getVerifiedUser("testUser", "wrongPassword");
        });
    }

    @Test
    void testGetVerifiedUserInvalidUsername() {
        assertThrows(AuthorizationException.class, () -> {
            UserDAO.getInstance().getVerifiedUser("nonExistentUser", "password123");
        });
    }

    @Test
    void testRegisterUser() throws AuthorizationException {
        User registeredUser = UserDAO.getInstance().registerUser("newUser", "newPassword", "user");
        assertEquals("newUser", registeredUser.getUsername());
    }

    @Test
    void testRegisterUserWithExistingUsername() {
        assertThrows(AuthorizationException.class, () -> {
            UserDAO.getInstance().registerUser("user", "newPassword", "user");
        });
    }
}