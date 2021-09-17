import { gql } from "@apollo/client";

export const SUPERHEROS = gql`
    query Superheros($limit: Int!, $heroPage: Int!) {
        superheros(limit: $limit, page: $heroPage) {
            total
            result {
                id
                nickname     
                real_name    
                origin_description   
                superpowers  
                catch_phrase     
                images   
            }         
        }
    }
`