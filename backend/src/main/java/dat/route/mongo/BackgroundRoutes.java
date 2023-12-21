package dat.route.mongo;

import dat.config.MongoConfig;
import dat.controller.mongo.BackgroundController;
import dat.route.Route;
import io.javalin.apibuilder.EndpointGroup;

import java.io.IOException;

import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;

public class BackgroundRoutes implements Route {
    private final BackgroundController backgroundController;

    public BackgroundRoutes() {
        try {
            this.backgroundController = new BackgroundController(MongoConfig.getDatabase());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getBasePath() {
        return Route.super.getBasePath();
    }

    @Override
    public EndpointGroup getRoutes() {
        return () -> {
          path("/backgrounds", () -> {
              get(backgroundController::getBackgrounds);
              path("/names", () -> {
                  get(backgroundController::getBackgroundNames);
              });
              path("name/{name}", () -> {
                  get(backgroundController::getByName);
              });
          });
        };
    }
}
