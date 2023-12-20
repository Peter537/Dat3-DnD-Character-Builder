package dat.route;

import dat.config.HibernateConfig;
import dat.controller.CountryController;
import dat.dao.DAO;
import dat.model.Country;
import io.javalin.apibuilder.EndpointGroup;

import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;

public class CountryRoutes implements Route {

    private final CountryController countryController = new CountryController(new DAO<>(Country.class, HibernateConfig.getEntityManagerFactory()));

    @Override
    public String getBasePath() {
        return "/countries";
    }

    @Override
    public EndpointGroup getRoutes() {
        return () -> {
            get(countryController::getAll);
            path("cca2/{id}", () -> {
                get(countryController::getById);
            });
        };
    }
}