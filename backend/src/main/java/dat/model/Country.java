package dat.model;

import dat.dto.CountryDTO;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
public class Country implements dat.model.Entity<CountryDTO> {

    @Id
    private String cca2;
    private String name;
    private String svg;

    public Country(String cca2, String name, String svg) {
        this.cca2 = cca2;
        this.name = name;
        this.svg = svg;
    }

    @Override
    public void setId(Object id) {
        if (id != null) {
            this.cca2 = String.valueOf(id);
        }
    }

    @Override
    public CountryDTO toDTO() {
        return new CountryDTO(this);
    }
}