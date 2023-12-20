package dat.controller.mongo;

import java.util.Objects;

import org.bson.Document;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import io.javalin.http.Context;

public class RaceController {

    MongoDatabase db;

    public RaceController(MongoDatabase db) {
        this.db = db;
    }

    public void getRaces(Context ctx) {
        MongoCollection<Document> race = db.getCollection("Race");
        ctx.json(Objects.requireNonNull(race.find().first()).toJson());
    }
}