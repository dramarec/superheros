import { Collection, ObjectId } from 'mongodb';

export interface Superhero {
    _id: ObjectId;
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
    images: string;
}

export interface Database {
    superheros: Collection<Superhero>;
}