package dat.route.mongo;

import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;

import java.io.IOException;

import dat.config.MongoConfig;
import dat.controller.mongo.RaceController;
import dat.route.Route;
import io.javalin.apibuilder.EndpointGroup;

public class RaceRoutes implements Route {

    private final RaceController raceController;

    public RaceRoutes() {
        try {
            this.raceController = new RaceController(MongoConfig.getDatabase());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public EndpointGroup getRoutes() {
        return () -> path("/race", () -> {
            get(raceController::getRaces);
            path("/{name}", () -> {
                get(raceController::getByName);
            });
        });
    }

}
