package dat.route;

import dat.controller.UserController;
import io.javalin.apibuilder.EndpointGroup;

import static io.javalin.apibuilder.ApiBuilder.path;
import static io.javalin.apibuilder.ApiBuilder.post;

public class UserRoutes implements Route {

    private final UserController userController = new UserController();

    @Override
    public String getBasePath() {
        return "/auth";
    }

    @Override
    public EndpointGroup getRoutes() {
        return () -> {
            path("/login", () -> post(userController::login));
            path("/register", () -> post(userController::register));
        };
    }
}