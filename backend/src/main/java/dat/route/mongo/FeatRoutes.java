package dat.route.mongo;

import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;

import java.io.IOException;

import com.mongodb.client.MongoDatabase;

import dat.config.MongoConfig;
import dat.controller.mongo.FeatController;
import dat.route.Route;
import io.javalin.apibuilder.EndpointGroup;

public class FeatRoutes implements Route {

    private final FeatController featController;

    public FeatRoutes() {
        try {
            this.featController = new FeatController(MongoConfig.getDatabase());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public EndpointGroup getRoutes() {
        return () -> {
            path("/feats", () -> {
                get(featController::getFeats);
            });
        };
    }

}