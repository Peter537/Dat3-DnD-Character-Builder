package dat;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dat.config.ApplicationConfig;
import dat.config.HibernateConfig;
import dat.dao.DAO;
import dat.model.Country;
import lombok.Setter;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

public class CountryPopulator {

    public static void main(String[] args) throws Exception {
        ApplicationConfig.startServer();
        String response = sendGetRequest("https://restcountries.com/v3.1/all?fields=name,flags,cca2");
//        System.out.println(response);
        List<CountriesClass> countries = new ObjectMapper().readValue(response, new TypeReference<List<CountriesClass>>(){});

        // Access objects in the list
        for (CountriesClass country : countries) {
//            System.out.println("Country Name: " + country.getName().getCommon());
//            System.out.println("Flag SVG: " + country.getFlags().getSvg());
//            System.out.println("CCA2 Code: " + country.getCca2());
            System.out.println();
            Country c = new Country(country.getCca2(), country.getName().getCommon(), country.getFlags().getSvg());
            System.out.println(c);
            DAO<Country> countryDAO = new DAO<>(Country.class, HibernateConfig.getEntityManagerFactory());
            countryDAO.create(c);
        }
    }

    public static String sendGetRequest(String url) throws Exception {
        HttpClient httpClient = HttpClient.newHttpClient();
        HttpRequest getRequest = HttpRequest.newBuilder()
                .uri(new URI(url))
                .GET()
                .build();

        HttpResponse<String> response = httpClient.send(getRequest, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    @Setter
    private static class CountriesClass {
        private Name name;
        private Flags flags;
        private String cca2;

        @JsonProperty("flags")
        public Flags getFlags() {
            return flags;
        }

        @JsonProperty("name")
        public Name getName() {
            return name;
        }

        @JsonProperty("cca2")
        public String getCca2() {
            return cca2;
        }
    }

    @Setter
    private static class Flags {
        private String svg;
        private String png;
        private String alt;

        @JsonProperty("png")
        public String getPng() {
            return png;
        }

        @JsonProperty("svg")
        public String getSvg() {
            return svg;
        }

        @JsonProperty("alt")
        public String getAlt() {
            return alt;
        }
    }

    @Setter
    private static class Name {
        private String common;
        private String official;
        private Map<String, Map<String, String>> nativeName;

        @JsonProperty("common")
        public String getCommon() {
            return common;
        }

        @JsonProperty("official")
        public String getOfficial() {
            return official;
        }

        @JsonProperty("nativeName")
        public Map<String, Map<String, String>> getNativeName() {
            return nativeName;
        }
    }
}