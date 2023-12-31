package dat.dto;

import dat.dao.UserDAO;
import dat.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.ZoneId;

@Getter
@ToString
@NoArgsConstructor
public class UserDTO implements DTO<User> {

    private String username;
    private String description;
    private Long createdAt;
    private String countryFlag;
    private String countryName;
    private String countryCode;
    private Integer id;

    public UserDTO(String username, int id) {
        this.username = username;
        this.id = id;
    }

    public UserDTO(String username, String description, Long createdAt, String countryCode, String countryFlag, String countryName, Integer id) {
        this.username = username;
        this.description = description;
        this.createdAt = createdAt;
        this.countryCode = countryCode;
        this.countryFlag = countryFlag;
        this.countryName = countryName;
        this.id = id;
    }

    public UserDTO(User user) {
        this(user.getUsername(),
                user.getDescription(),
                user.getCreatedOn().atZone(ZoneId.systemDefault()).toInstant().getEpochSecond() * 1000,
                user.getCountry() != null ? user.getCountry().getCca2() : "",
                user.getCountry() != null ? user.getCountry().getSvg() : "",
                user.getCountry() != null ? user.getCountry().getName() : "",
                user.getId());
    }

    public void setId(String id) {
        this.id = Integer.parseInt(id);
    }

    @Override
    public User toEntity() {
        UserDAO userDAO = UserDAO.getInstance();
        return userDAO.readById(this.username).orElse(null);
    }
}