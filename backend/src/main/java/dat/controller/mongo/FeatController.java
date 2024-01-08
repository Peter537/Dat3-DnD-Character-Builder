package dat.controller.mongo;

import java.util.Arrays;
import java.util.Objects;

import com.mongodb.client.AggregateIterable;
import com.nimbusds.jose.shaded.json.JSONArray;
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


    public void getFeatNames(Context ctx) {
        MongoCollection<Document> feats = db.getCollection("Feat");

        AggregateIterable<Document> result = feats.aggregate(Arrays.asList(
                new Document("$unwind", "$feat"),
                new Document("$project",
                        new Document("_id", 0L)
                                .append("name", "$feat.name"))));

        JSONArray jsonArray = new JSONArray();
        result.forEach(document -> jsonArray.add(document.get("name")));
        ctx.json(jsonArray);
    }
}
