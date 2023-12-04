package dat.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import dat.config.ApplicationConfig;
import dat.dto.UserDTO;
import dat.exception.ApiException;
import dat.exception.AuthorizationException;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.text.ParseException;
import java.util.*;

public class TokenFactory {

    private static TokenFactory INSTANCE;

    private final Logger LOGGER = LoggerFactory.getLogger(TokenFactory.class);
    private final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private final SignVerifyToken SIGNATURE;

    private TokenFactory() {
        String[] properties = getProperties();
        String issuer = properties[0];
        String tokenExpireTime = properties[1];
        String secretKey = properties[2];
        this.SIGNATURE = new SignVerifyToken(issuer, tokenExpireTime, secretKey);
    }

    public static TokenFactory getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new TokenFactory();
        }

        return INSTANCE;
    }

    public String[] parseJsonObject(String jsonString, boolean tryLogin) throws ApiException {
        try {
            @SuppressWarnings("rawtypes")
            Map json = OBJECT_MAPPER.readValue(jsonString, Map.class);
            String username = json.get("username").toString();
            String password = json.get("password").toString();
            StringBuilder role = new StringBuilder();
            if (!tryLogin) {
                role.append(json.get("role").toString());
                List<String> roles = Arrays.asList("user", "admin", "manager");
                if (!roles.contains(role.toString())) {
                    throw new ApiException(400, "Role not valid");
                }
            }

            return new String[] {
                    username,
                    password,
                    role.toString()
            };
        } catch (JsonProcessingException | NullPointerException e) {
            throw new ApiException(400, "Malformed JSON Supplied");
        }
    }

    public String createToken(String userName, Set<String> roles) throws ApiException {
        try {
            String rolesAsString = String.join(",", roles);
            return SIGNATURE.signToken(userName, rolesAsString, new Date());
        } catch (JOSEException e) {
            throw new ApiException(500, "Could not create token");
        }
    }

    public UserDTO verifyToken(String token) throws ApiException, AuthorizationException {
        try {
            SignedJWT signedJWT = SIGNATURE.parseTokenAndVerify(token);
            JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
            return SIGNATURE.getJWTClaimsSet(claimsSet);
        } catch (ParseException | JOSEException e) {
            throw new ApiException(401, e.getMessage());
        }
    }

    /**
     * Get properties from pom file
     *
     * @return String array with properties in order: issuer, token expiration time, secret key
     */
    @NotNull
    private String[] getProperties() {
        try {
            return new String[]{
                    ApplicationConfig.getProperty("issuer"),
                    ApplicationConfig.getProperty("token.expiration.time"),
                    ApplicationConfig.getProperty("secret.key")
            };
        } catch (IOException e) {
            LOGGER.error("Could not get properties", e);
            return new String[]{ "", "", "" };
        }
    }
}