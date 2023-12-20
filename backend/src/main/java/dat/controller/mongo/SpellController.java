package dat.controller.mongo;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.nimbusds.jose.shaded.json.JSONArray;
import io.javalin.http.Context;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Arrays;
import java.util.Objects;

public class SpellController {
    MongoDatabase db;

    public SpellController(MongoDatabase db) {
        this.db = db;
    }

    public void getSpellBooks(Context ctx) {
        MongoCollection<Document> spellBooks = db.getCollection("Spell");
        FindIterable<Document> results = spellBooks.find(new Document("BookList", true));
        ctx.json(Objects.requireNonNull(results.first()).toJson());
    }

    public void getByBook(Context ctx) {
        final String book = ctx.pathParam("book");
        Bson filter = new Document("spell.source", book);
        MongoCollection<Document> spells = db.getCollection("Spell");
        FindIterable<Document> results = spells.find(filter);
        ctx.json(Objects.requireNonNull(results.first()).toJson());
    }

    public void getByClass(Context ctx) {
        throw new UnsupportedOperationException("Not supported yet.");
        // Notes: So far there is no plan for how this will be made, but there exist 2 entities containing lists of which spells are available to which classes.
        // The first is part of the "getSpellBooks" method, which returns a list of all the books, and the classes that can use them.
        // The second is in the Lookup tables collections.
        // Solutions:
        // Filter statement that sorts through the spellbooks, and returns the requested class.
    }

    public void getByLevel(Context ctx) {
        // Get the desired level from the request
        final int desiredLevel = Integer.parseInt(ctx.pathParam("level"));

        // Get the collection
        MongoCollection<Document> collection = db.getCollection("Spell");

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$unwind", "$spell"),
                new Document("$match",
                        new Document("spell.level", desiredLevel)),
                new Document("$project",
                        new Document("spell", desiredLevel))));
        JSONArray jsonArray = new JSONArray();
        result.forEach(jsonArray::add);

        ctx.json(jsonArray);
    }

    public void getBySchool(Context ctx) {
        // Get the desired level from the request
        final int desiredLevel = Integer.parseInt(ctx.pathParam("school"));

        // Get the collection
        MongoCollection<Document> collection = db.getCollection("Spell");

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$unwind", "$spell"),
                new Document("$match",
                        new Document("spell.school", desiredLevel)),
                new Document("$project",
                        new Document("spell", desiredLevel))));
        JSONArray jsonArray = new JSONArray();
        result.forEach(jsonArray::add);

        ctx.json(jsonArray);
    }
}