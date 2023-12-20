package dat.route;

import dat.config.MongoConfig;
import dat.controller.SpellController;
import io.javalin.apibuilder.EndpointGroup;

import java.io.IOException;

import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;

public class SpellRoutes implements Route {

    private SpellController spellController = null;

    public SpellRoutes() {
        try {
            this.spellController = new SpellController(MongoConfig.getDatabase());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    public String getBasePath() {
        return Route.super.getBasePath();
    }

    @Override
    public EndpointGroup getRoutes() {
        return () -> path("/spells", () -> {
            path("/book", () -> {
                get(spellController::getSpellBooks);
                path("/{book}", () -> {
                    get(spellController::getByBook);
                });
            });
            path("/{level}", () -> {
                get(spellController::getByLevel);
            });
        });
    }
}
