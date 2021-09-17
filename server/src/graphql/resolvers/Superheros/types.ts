import { Superhero } from "../../../lib/types";

export interface CreateSuperheroInput {
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
    images: string
}

export interface SuperheroArgs {
    input: CreateSuperheroInput;
}

export interface SuperherosArgs {
    limit: number;
    page: number;
}

export interface SuperherosData {
    total: number;
    result: Superhero[]
}