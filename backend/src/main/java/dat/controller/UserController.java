package dat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dat.dao.UserDAO;
import dat.exception.ApiException;
import dat.exception.AuthorizationException;
import dat.model.User;
import dat.security.TokenFactory;
import io.javalin.http.Context;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
public class UserController {

    private final UserDAO USER_DAO = UserDAO.getInstance();
    private final TokenFactory TOKEN_FACTORY = TokenFactory.getInstance();
    private final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    public void login(Context ctx) throws ApiException, AuthorizationException {
        String[] userInfos = getUserInfos(ctx, true);
        User user = getVerfiedOrRegisterUser(userInfos[0], userInfos[1], "", false);
        String token = getToken(userInfos[0], user.getRolesAsStrings());

        // Create response
        ctx.status(200);
        ctx.result(createResponse(userInfos[0], token));
    }

    public void register(Context ctx) throws ApiException, AuthorizationException {
        String[] userInfos = getUserInfos(ctx, false);
        User user = getVerfiedOrRegisterUser(userInfos[0], userInfos[1], userInfos[2], true);
        String token = getToken(userInfos[0], user.getRolesAsStrings());

        // Create response
        ctx.res().setStatus(201);
        ctx.result(createResponse(userInfos[0], token));
    }

    private String createResponse(String username, String token) {
        return OBJECT_MAPPER.createObjectNode()
                .put("username", username)
                .put("token", token)
                .toString();
    }

    private String[] getUserInfos(Context ctx, boolean tryLogin) throws ApiException {
        return TOKEN_FACTORY.parseJsonObject(ctx.body(), tryLogin);
    }

    private User getVerfiedOrRegisterUser(String username, String password, String role, boolean isCreate) throws AuthorizationException {
        return isCreate ? USER_DAO.registerUser(username, password, role) : USER_DAO.getVerifiedUser(username, password);
    }

    private String getToken(String username, Set<String> userRoles) throws ApiException {
        return TOKEN_FACTORY.createToken(username, userRoles);
    }
}