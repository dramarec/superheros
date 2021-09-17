import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Superhero {
        id: ID
        nickname: String
        real_name: String
        origin_description: String
        superpowers: String
        catch_phrase: String
        images: String
    }

    type Superheros {
        total: Int!
        result: [Superhero!]! 
    }

    type Query {
        superheros(limit: Int!, page: Int!): Superheros!
        superhero(id: ID!): Superhero!
    }

    input SuperheroInput {
        nickname: String
        real_name: String
        origin_description: String
        superpowers: String
        catch_phrase: String
        images: String
    }

    type Mutation {
        createSuperhero(input: SuperheroInput!): Superhero!
        updateSuperhero(id: ID!, input: SuperheroInput!): Superhero!
        deleteSuperhero(id: ID!): Superhero!
    }
`
