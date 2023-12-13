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
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToOne
    private Source source;

    private Integer page;
    private Boolean srd;
    private String basicRules;
    private String custom;

    @ManyToOne
    private ItemType type;

    private String rarity;
    private Double weight;
    private Integer value;
    private String ac;
    private Integer strength;
    private String otherRequirements;

    @ManyToOne
    private Armor armor;

    private Boolean allowsStealth;
}