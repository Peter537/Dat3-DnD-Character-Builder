package dat.controller.mongo;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.nimbusds.jose.shaded.json.JSONObject;
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
        String userId = ctx.pathParam("userId");

        MongoCollection<Document> characters = db.getCollection("Character");
        AggregateIterable<Document> result = characters.aggregate(Arrays.asList(new Document("$unwind", "$character"),
                new Document("$match",
                        new Document("userId", userId)))
        );
        ctx.json(Objects.requireNonNull(result.first()).toJson());
    }

    public void createCharacter(Context ctx) {
        JSONObject character = ctx.bodyAsClass(JSONObject.class);

        db.getCollection("Character").insertOne(
                new Document()
                        .append("_id", new ObjectId())
                        .append("userId", character.get("userId"))
                        .append("data", character.get("data"))
        );

        ctx.status(201);
    }
}
