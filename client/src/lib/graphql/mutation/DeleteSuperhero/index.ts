import { gql } from "@apollo/client";

export const DELETE_SUPERHERO = gql `
    mutation DeleteSuperhero($id: ID!){
        deleteSuperhero(id: $id) {
            id
        } 
    }
`