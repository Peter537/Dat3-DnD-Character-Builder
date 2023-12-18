package dat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dat.dao.UserDAO;
import dat.exception.ApiException;
import dat.exception.AuthorizationException;
import dat.model.User;
import dat.security.TokenFactory;
import io.javalin.http.Context;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserController {

    private final UserDAO USER_DAO = UserDAO.getInstance();
    private final TokenFactory TOKEN_FACTORY = TokenFactory.getInstance();
    private final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    public void login(Context ctx) throws ApiException, AuthorizationException {
        User user = getUser(ctx, false);
        String token = getToken(user);

        // Create response
        ctx.status(200);
        ctx.result(createResponse(user.getUsername(), token));
    }

    public void register(Context ctx) throws ApiException, AuthorizationException {
        User user = getUser(ctx, true);
        String token = getToken(user);

        // Create response
        ctx.res().setStatus(201);
        ctx.result(createResponse(user.getUsername(), token));
    }

    private User getUser(Context ctx, boolean isCreate) throws ApiException, AuthorizationException {
        String[] userInfos = getUserInfos(ctx);
        return getVerfiedOrRegisterUser(userInfos[0], userInfos[1], userInfos[2], "USER", isCreate);
    }

    private String createResponse(String username, String token) {
        return OBJECT_MAPPER.createObjectNode()
                .put("username", username)
                .put("token", token)
                .toString();
    }

    private String[] getUserInfos(Context ctx) throws ApiException {
        return TOKEN_FACTORY.parseJsonObject(ctx.body());
    }

    private User getVerfiedOrRegisterUser(String email, String username, String password, String role, boolean isCreate) throws AuthorizationException {
        if (isCreate) {
            return USER_DAO.registerUser(email, username, password, role);
        }

        return email.isEmpty() ? USER_DAO.getVerifiedUserFromUsername(username, password) : USER_DAO.getVerifiedUser(email, password);
    }

    private String getToken(User user) throws ApiException {
        return TOKEN_FACTORY.createToken(user.getUsername(), user.getId());
    }
}