package dat.model;

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
public class Country {

    @Id
    private String cca2;
    private String name;
    private String svg;

    public Country(String cca2, String name, String svg) {
        this.cca2 = cca2;
        this.name = name;
        this.svg = svg;
    }
}