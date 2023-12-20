package dat.controller;

import dat.dao.DAO;
import dat.dto.CountryDTO;
import dat.model.Country;

public class CountryController extends Controller<Country, CountryDTO> {

    public CountryController(DAO<Country> dao) {
        super(dao);
    }
}