package dat.controller;

import com.mongodb.client.MongoDatabase;
import io.javalin.http.Context;

public class SpellController {
    MongoDatabase db;

    public SpellController(MongoDatabase db) {
        this.db = db;
    }

    public void getAllByBook(Context ctx) {
        final String book = ctx.pathParam("book");
        db.getCollection("Spell").find().forEach(document -> {
            if (document.get("book").equals(book)) {
                ctx.status(200);
                ctx.json(document);
            }
        });
    }

    public void getByClass(Context ctx) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public void getByLevel(Context ctx) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public void getBySchool(Context ctx) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}

//        app.routes(() -> path("/mongo", () -> {
//            get(ctx -> {
//                try {
//                    List<String> collections = new ArrayList<>();
//                    MongoConfig.getDatabase().listCollectionNames().into(collections);
//                    String jsonArray = JSONArray.toJSONString(collections);
//                    ctx.result(jsonArray);
//                } catch (Exception e) {
//                    throw new RuntimeException(e);
//                }
//            });
//            get("/spells", ctx -> {
//                try {
//                    ctx.result(Objects.requireNonNull(Objects.requireNonNull(MongoConfig.getDatabase().getCollection("Spell").find().skip(8)).first()).toJson());
//                } catch (Exception e) {
//                    throw new RuntimeException(e);
//                }
//            });
//        }));