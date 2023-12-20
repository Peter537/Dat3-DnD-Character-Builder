package dat.route.mongo;

import dat.config.MongoConfig;
import dat.controller.mongo.ClassController;
import dat.route.Route;
import io.javalin.apibuilder.EndpointGroup;

import java.io.IOException;

import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;

public class ClassRoutes implements Route {
    private final ClassController classController;

    public ClassRoutes() {
        try {
            this.classController = new ClassController(MongoConfig.getDatabase());
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
            path("/classes", () -> {
                get(classController::getClasses);
                path("/{className}", () -> {
                    get(classController::getClassByName);
                });
            });
        };
    }
}
