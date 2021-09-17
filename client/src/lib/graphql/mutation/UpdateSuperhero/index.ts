import { gql } from "@apollo/client";

export const UPDATE_SUPERHERO = gql `
    mutation UpdateSuperhero($id: ID!, $input: SuperheroInput!){
        updateSuperhero(id: $id, input: $input) {
            id,
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
            images
        } 
    }
`