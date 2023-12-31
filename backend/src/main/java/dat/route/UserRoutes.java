package dat.route;

import dat.controller.UserController;
import dat.dao.UserDAO;
import io.javalin.apibuilder.EndpointGroup;

import static io.javalin.apibuilder.ApiBuilder.*;

public class UserRoutes implements Route {

    private final UserController userController = new UserController(UserDAO.getInstance());

    @Override
    public String getBasePath() {
        return "/users";
    }

    @Override
    public EndpointGroup getRoutes() {
        return () -> {
            path("/{id}", () -> {
                get(userController::getById);
                put(userController::put);
            });
        };
    }
}