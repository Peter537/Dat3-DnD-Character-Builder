package dat.controller.mongo;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.nimbusds.jose.shaded.json.JSONArray;
import io.javalin.http.Context;
import org.bson.Document;

import java.util.Arrays;
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

    public void getBackgroundNames(Context ctx) {
        MongoCollection<Document> backgrounds = db.getCollection("Background");
        AggregateIterable<Document> result = backgrounds.aggregate(Arrays.asList(new Document("$unwind", "$background"),
                new Document("$project",
                        new Document("background.name", 1L)))
        );
        JSONArray jsonArray = new JSONArray();
        result.forEach(jsonArray::add);

        ctx.json(jsonArray);
    }

    public void getByName(Context ctx) {
        String name = ctx.pathParam("name");

        MongoCollection<Document> backgrounds = db.getCollection("Background");
        AggregateIterable<Document> result = backgrounds.aggregate(Arrays.asList(new Document("$unwind", "$background"),
                new Document("$match",
                        new Document("background.name", name)))
        );
        ctx.json(Objects.requireNonNull(result.first()).toJson());
    }
}
