# Dat3-DnD-Character-Builder

## Table of Contents

1. [Endpoints](#endpoints)

### Endpoints

| Route                     | Method | Params                                                             | Returns                                         |
| ------------------------- | ------ | ------------------------------------------------------------------ | ----------------------------------------------- |
| /api/v1/auth/login        | POST   | Email & Password                                                   | A valid JWT                                     |
| /api/v1/auth/register     | POST   | Email, Username & Password                                         | A valid JWT                                     |
| /api/v1/users/            | GET    | ID of a user                                                       | A user DTO                                      |
| /api/v1/users/            | PUT    | Username, Description, Country flag, Country name and Country code | The updated user DTO                            |
| /api/v1/countries         | GET    |                                                                    | A list of countries                             |
| /api/v1/countries/cca2/   | GET    | ID of a country                                                    | A country with a certain ID                     |
| /api/v1/spells/           | GET    | Name of spell                                                      | Spell with a certain name                       |
| /api/v1/spells/book       | GET    |                                                                    | Gets all books containing spells                |
| /api/v1/spells/book/      | GET    | Name of book                                                       | Gets book containing spells with a certain name |
| /api/v1/spells/level/     | GET    | Level of spell                                                     | Gets all spells with a certain level            |
| /api/v1/spells/school/    | GET    | School of spell                                                    | Gets all spells with a school                   |
| /api/v1/backgrounds       | GET    |                                                                    | Gets all backgrounds                            |
| /api/v1/backgrounds/names | GET    |                                                                    | Gets all names of backgrounds                   |
| /api/v1/backgrounds/name/ | GET    | Name of background                                                 | Gets background with a certain name             |
| /api/v1/classes           | GET    |                                                                    | Gets all classes                                |
| /api/v1/classes/          | GET    | Name of class                                                      | Gets class with a certain name                  |
| /api/v1/feats             | GET    |                                                                    | Gets all feats                                  |
| /api/v1/race              | GET    |                                                                    | Gets all races                                  |
| /api/v1/race/             | GET    | Name of race                                                       | Gets race with a certain name                   |
