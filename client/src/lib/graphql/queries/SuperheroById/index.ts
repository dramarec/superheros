import { gql } from "@apollo/client";

export const SUPERHERO = gql`
    query Superhero($id: ID!) {
        superhero(id: $id) {
            id
            nickname     
            real_name    
            origin_description   
            superpowers  
            catch_phrase     
            images   
        }
    }
`