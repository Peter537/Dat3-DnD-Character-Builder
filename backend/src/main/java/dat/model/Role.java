package dat.model;

import io.javalin.security.RouteRole;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "roles")
@NamedQueries(@NamedQuery(name = "Role.deleteAllRows", query = "DELETE FROM Role"))
@Getter
@NoArgsConstructor
public class Role implements Serializable, RouteRole {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false)
    @Column(name = "role_name", length = 20)
    private String name;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
    private final Set<User> userList = new LinkedHashSet<>();

    public Role(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        Role otherRole = (Role) other;
        return Objects.equals(this.name.toLowerCase(), otherRole.name.toLowerCase());
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.name);
    }

    public static Role of(String name) {
        return new Role(name);
    }
}