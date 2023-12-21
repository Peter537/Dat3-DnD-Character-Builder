package dat.route.mongo;

import com.mongodb.client.MongoDatabase;
import dat.config.MongoConfig;
import dat.controller.mongo.CharacterController;
import dat.route.Route;
import io.javalin.apibuilder.EndpointGroup;

import java.io.IOException;

import static io.javalin.apibuilder.ApiBuilder.path;
import static io.javalin.apibuilder.ApiBuilder.post;

public class CharacterRoutes implements Route {

    private final CharacterController characterController;

    public CharacterRoutes() {
        try {
            this.characterController = new CharacterController(MongoConfig.getDatabase());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public EndpointGroup getRoutes() {
        return () -> {
            path("/character", () -> {
                 post(characterController::createCharacter);
                // path("/{id}", () -> {
                //     get(characterController::getById);
                //     put(characterController::updateCharacter);
                //     delete(characterController::deleteCharacter);
                // });
            });
        };
    }
}
