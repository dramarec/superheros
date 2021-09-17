export interface ISuperhero {
    id: string;
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
    images: string;
}

export interface ISuperhero_ISuperheroData {
    total: number;
    result: ISuperhero[];
}

export interface ISuperheroData {
    superheros: ISuperhero_ISuperheroData
}

export interface SuperherosVariables {
    limit: number;
    heroPage: number;
}

export interface IDeleteSuperheroData {
    deleteSuperhero: ISuperhero;
}

export interface IDeleteSuperheroVariables {
    id: string;
}