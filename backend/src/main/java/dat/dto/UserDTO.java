package dat.dto;

import dat.dao.UserDAO;
import dat.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class UserDTO implements DTO<User> {

    private String username;
    private int id;

    public UserDTO(String username, int id) {
        this.username = username;
        this.id = id;
    }

    public UserDTO(User user) {
        this(user.getUsername(), user.getId());
    }

    @Override
    public User toEntity() {
        UserDAO userDAO = UserDAO.getInstance();
        return userDAO.readById(this.username).orElse(null);
    }
}