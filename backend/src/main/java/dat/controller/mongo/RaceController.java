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

    public void getRaceByName(Context ctx) { // TODO: Finish this. Gives the wrong result.
        final String raceName = ctx.pathParam("raceName");
        MongoCollection<Document> races = db.getCollection("Race");
        Document result = races.find(new Document("race.name", raceName)).first();
        if (result != null)
            ctx.json(result.toJson());
        else
            ctx.status(500);
    }
}