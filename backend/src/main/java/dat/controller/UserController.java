package dat.controller;

import dat.dao.UserDAO;
import dat.dto.UserDTO;
import dat.exception.ApiException;
import dat.model.User;
import io.javalin.http.Context;

public class UserController extends Controller<User, UserDTO> {

    private final UserDAO dao;

    public UserController(UserDAO dao) {
        super(dao);
        this.dao = dao;
    }

    @Override
    public void put(Context ctx) throws ApiException {
        super.validateId(ctx); // Will throw ApiException if id is invalid
        final String id = ctx.pathParam("id");
        final UserDTO jsonRequest = ctx.bodyAsClass(UserDTO.class);
        jsonRequest.setId(id);
        final User entity = this.dao.update(jsonRequest);
        ctx.status(200);
        ctx.json(entity.toDTO());
    }
}