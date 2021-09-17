import { gql } from "@apollo/client";

export const CREATE_SUPERHERO = gql `
    mutation CreateSuperhero($input: SuperheroInput!){
        createSuperhero(input: $input){
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