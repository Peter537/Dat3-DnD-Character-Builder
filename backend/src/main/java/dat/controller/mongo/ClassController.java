package dat.controller.mongo;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.nimbusds.jose.shaded.json.JSONArray;
import io.javalin.http.Context;
import org.bson.Document;

import java.util.Arrays;
import java.util.Objects;

public class ClassController {
    MongoDatabase db;

    public ClassController(MongoDatabase db) {
        this.db = db;
    }

    public void getClasses(Context ctx) {
        MongoCollection<Document> classes = db.getCollection("Class");
        AggregateIterable<Document> result = classes.aggregate(Arrays.asList(new Document("$unwind", "$class")));
        JSONArray array = new JSONArray();
        result.forEach(array::add);
        ctx.json(array);
    }

    public void getClassByName(Context ctx) {
        final String className = ctx.pathParam("className");
        MongoCollection<Document> classes = db.getCollection("Class");
        Document result = classes.find(new Document("class.name", className)).first();
        if (result != null)
            ctx.json(result.toJson());
        else
            ctx.status(500);
    }
}
