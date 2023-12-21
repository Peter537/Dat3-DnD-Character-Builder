package dat.controller.mongo;

import com.mongodb.client.MongoDatabase;
import com.nimbusds.jose.shaded.json.JSONObject;
import io.javalin.http.Context;
import org.bson.Document;
import org.bson.json.JsonObject;
import org.bson.types.ObjectId;

public class CharacterController {

    MongoDatabase db;

    public CharacterController(MongoDatabase db) {
        this.db = db;
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
