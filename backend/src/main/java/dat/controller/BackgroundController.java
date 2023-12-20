package dat.controller;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import io.javalin.http.Context;
import org.bson.Document;

import java.util.Objects;

public class BackgroundController {
    MongoDatabase db;

    public BackgroundController(MongoDatabase db) {
        this.db = db;
    }

    public void getBackgrounds(Context ctx) {
        MongoCollection<Document> backgrounds = db.getCollection("Background");
        ctx.json(Objects.requireNonNull(backgrounds.find().first()).toJson());
    }
}
