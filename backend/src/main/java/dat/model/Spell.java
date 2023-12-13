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
public class Spell {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Source source;

    @ManyToOne
    private School school;

    private Integer page;
    private Boolean srd;
    private Integer level;

    @ManyToOne
    private CastType castType;
    private Double castTime;

    @ManyToOne
    private CastRange castRange;

    private String verbal;
    private String somatic;
    private String material;
    private String duration;

    @ManyToOne
    private ScalableDice scalableDice;
}