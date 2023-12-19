package dat.route;

import dat.controller.UserController;
import io.javalin.apibuilder.EndpointGroup;

import static io.javalin.apibuilder.ApiBuilder.path;
import static io.javalin.apibuilder.ApiBuilder.post;

public class AuthenticationRoutes implements Route {

    private final UserController userController = new UserController();

    @Override
    public String getBasePath() {
        return "/auth";
    }

    @Override
    public EndpointGroup getRoutes() {
        return () -> {
            path("/login", () -> post(ctx -> userController.authenticate(ctx, false)));
            path("/register", () -> post(ctx -> userController.authenticate(ctx, true)));
        };
    }
}