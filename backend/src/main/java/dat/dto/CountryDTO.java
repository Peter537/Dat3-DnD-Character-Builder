package dat.dto;

import dat.config.HibernateConfig;
import dat.dao.DAO;
import dat.model.Country;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class CountryDTO implements DTO<Country> {

    private String cca2;
    private String name;
    private String svg;

    public CountryDTO(Country country) {
        this.cca2 = country.getCca2();
        this.name = country.getName();
        this.svg = country.getSvg();
    }

    @Override
    public Country toEntity() {
        DAO<Country> dao = new DAO<>(Country.class, HibernateConfig.getEntityManagerFactory());
        return dao.readById(this.cca2).orElse(null);
    }
}