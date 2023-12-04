package dat.model;

import dat.dto.UserDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;

import java.io.Serial;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@NamedQueries(@NamedQuery(name = "User.deleteAllRows", query = "DELETE FROM User"))
@Getter
@NoArgsConstructor
public class User implements Serializable, dat.model.Entity<UserDTO> {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false)
    @Column(name = "user_name", length = 25)
    private String username;

    @Basic(optional = false)
    @Column(name = "user_password", nullable = false)
    private String password;

    @JoinTable(name = "user_roles", joinColumns = {
            @JoinColumn(name = "user_name", referencedColumnName = "user_name")}, inverseJoinColumns = {
            @JoinColumn(name = "role_name", referencedColumnName = "role_name")})
    @ManyToMany(fetch = FetchType.EAGER)
    private final Set<Role> roles = new LinkedHashSet<>();

    public User(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public Set<String> getRolesAsStrings() {
        return this.roles.stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
    }

    public boolean checkPassword(String checkedPassword) {
        return BCrypt.checkpw(checkedPassword, this.password);
    }

    public void setPassword(String password) {
        this.password = BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }

    @Override
    public void setId(Object id) {
        if (id != null) {
            this.username = id.toString();
        }
    }

    @Override
    public UserDTO toDTO() {
        return new UserDTO(this);
    }
}