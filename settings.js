import { buildSchema } from "graphql";
import Query from "./db.js";

const schema = buildSchema(
    `
    type City {
    ID: Int
    Name: String
    CountryCode: String
    District: String
    Population: Int
    }
    type Query {
    cities: [City]
    }
    type Mutation {
    addCity(Name: String, CountryCode: String, District: String, Population: Int): String
    updateCity(ID: Int, Name: String, CountryCode: String, District: String, Population: Int): String
    deleteCity(ID: Int): String
  }`
);


const resolvers = {
    cities: async () => {
        try{
            const results = await Query("SELECT * FROM city LIMIT 10");
            return results;
        } catch (err) {
            throw new Error("Failed to fetch cities");
        }
    },
    addCity: async ({Name,CountryCode,District,Population}) =>{
        try{
            await Query("INSERT INTO city(Name,CountryCode,District,Population) VALUES(?,?,?,?);");
            return "City added successfully!";

        } catch (err) {
            throw new Error("Failed to add cities");
        }
    },
    updateCity: async ({ ID, Name, CountryCode, District, Population }) => {
        try {
          await Query(
            "UPDATE city SET Name = ?, CountryCode = ?, District = ?, Population = ? WHERE ID = ?",
            [Name, CountryCode, District, Population, ID]
          );
          return "City updated successfully!";
        } catch (err) {
          throw new Error("Failed to update city");
        }
      },
    deleteCity: async ({ ID }) => {
        try {
          await Query("DELETE FROM city WHERE ID = ?", [ID]);
          return `City with ID ${ID} deleted successfully!`;
        } catch (err) {
          throw new Error("Failed to delete city");
        }
      },
};

export {schema,resolvers};