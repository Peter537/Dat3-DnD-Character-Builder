package dat.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import java.io.IOException;

public class MongoConfig {

    private static MongoClient mongoClient;
    private static MongoDatabase database;

    private static MongoClient buildMongoClient() throws IOException {
        ConnectionString connectionString = new ConnectionString(ApplicationConfig.getProperty("mongo.connection.string"));
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .retryWrites(true)
                .build();
        return MongoClients.create(settings);
    }

    public static MongoDatabase getDatabase() throws IOException {
        if (database == null) {
            mongoClient = buildMongoClient();
            database = mongoClient.getDatabase("myDatabase");
        }

        return database;
    }
}