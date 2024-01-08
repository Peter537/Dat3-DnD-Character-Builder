package dat.controller.mongo;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.mongodb.client.AggregateIterable;
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

    public void getByName(Context ctx) {
        String name = ctx.pathParam("name");

        MongoCollection<Document> races = db.getCollection("Race");
        AggregateIterable<Document> result = races.aggregate(Arrays.asList(new Document("$unwind", "$race"),
                new Document("$match",
                        new Document("race.name", name)))
        );
        ctx.json(Objects.requireNonNull(result.first()).toJson());
    }

// ... (other imports and code)

    public void getAllRaceNames(Context ctx) {
        MongoCollection<Document> races = db.getCollection("Race");
        ArrayList<String> raceNames = new ArrayList<>();

        races.find().projection(new Document("race.name", 1)).forEach(document -> {
            List<Document> raceEntries = document.getList("race", Document.class);
            for (Document raceEntry : raceEntries) {
                String name = raceEntry.getString("name");
                raceNames.add(name);
            }
        });

        ctx.json(raceNames);
    }


}