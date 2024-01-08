package dat.controller.mongo;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.nimbusds.jose.shaded.json.JSONArray;
import com.nimbusds.jose.shaded.json.JSONObject;
import dat.exception.ApiException;
import dat.exception.AuthorizationException;
import dat.security.TokenFactory;
import io.javalin.http.Context;
import org.bson.Document;
import org.bson.json.JsonObject;
import org.bson.types.ObjectId;

import java.util.Arrays;
import java.util.Objects;

public class CharacterController {

    MongoDatabase db;

    public CharacterController(MongoDatabase db) {
        this.db = db;
    }

    public void getById(Context ctx) {
        String id = ctx.pathParam("id");

        MongoCollection<Document> characters = db.getCollection("Character");
        AggregateIterable<Document> result = characters.aggregate(Arrays.asList(new Document("$unwind", "$character"),
                new Document("$match",
                        new Document("_id", id)))
        );
        ctx.json(Objects.requireNonNull(result.first()).toJson());
    }

    public void getByUser(Context ctx) {
        int userId;
        try {
            userId = TokenFactory.getInstance().verifyToken(Objects.requireNonNull(ctx.header("Authorization")).split(" ")[1]).getId();
        } catch (ApiException | AuthorizationException e) {
            throw new RuntimeException(e);
        }

        MongoCollection<Document> characters = db.getCollection("Character");
        AggregateIterable<Document> result = characters.aggregate(Arrays.asList(new Document("$unwind", "$character"),
                new Document("$match",
                        new Document("userId", userId)))
        );

        JSONArray jsonArray = new JSONArray();
        result.forEach(jsonArray::add);

        ctx.json(jsonArray);
    }

    public void createCharacter(Context ctx) {
        JSONObject character = ctx.bodyAsClass(JSONObject.class);
        int userId;
        try {
            userId = TokenFactory.getInstance().verifyToken(Objects.requireNonNull(ctx.header("Authorization")).split(" ")[1]).getId();
        } catch (ApiException | AuthorizationException e) {
            throw new RuntimeException(e);
        }

        db.getCollection("Character").insertOne(
                new Document()
                        .append("_id", new ObjectId())
                        .append("userId", userId)
                        .append("data", character.get("data"))
        );

        ctx.status(201);
    }
}
