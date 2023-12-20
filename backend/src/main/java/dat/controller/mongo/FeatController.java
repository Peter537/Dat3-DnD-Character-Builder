package dat.controller.mongo;

import java.util.Objects;

import org.bson.Document;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import io.javalin.http.Context;

public class FeatController {
    MongoDatabase db;

    public FeatController(MongoDatabase db) {
        this.db = db;
    }

    public void getFeats(Context ctx) {
        MongoCollection<Document> feats = db.getCollection("Feat");
        ctx.json(Objects.requireNonNull(feats.find().first()).toJson());
    }
}
