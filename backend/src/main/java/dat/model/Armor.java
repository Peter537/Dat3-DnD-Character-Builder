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
public class Armor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // TODO: Add Character

    @ManyToOne
    private Item item;

    @ManyToOne
    private Spell spell;

    private String srcName;
    private Integer value;
    private Boolean isArmor;
    private Boolean isItem;
    private Boolean isSpell;
    private Boolean isOther;
}