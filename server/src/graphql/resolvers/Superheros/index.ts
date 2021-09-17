import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Database, Superhero } from '../../../lib/types';
import { SuperheroArgs, SuperherosArgs, SuperherosData } from './types';

export const marvelResolvers: IResolvers = {
    Query: {
        superheros: async (
            _root: undefined,
            { limit, page }: SuperherosArgs,
            { db }: { db: Database }
        ): Promise<SuperherosData> => {
            try {
                let data: SuperherosData = {
                    total: 0,
                    result: []
                }

                let cursor = await db.superheros.find({});

                cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);

                data.total = await cursor.count();
                data.result = await cursor.toArray();

                return data
            } catch (error) {
                throw new Error(`Error Query superheros ${error}`)
            }
        },
        superhero: async (
            _root: undefined,
            { id }: ObjectId,
            { db }: { db: Database }
        ): Promise<Superhero> => {
            try {
                const result = await db.superheros.findOne({
                    _id: new ObjectId(id),
                })

                if (!result) {
                    throw new Error("failed to find superhero");
                }

                return result
            } catch (error) {
                throw new Error(`Error Query superhero ${error}`)
            }
        }
    },
    Mutation: {
        createSuperhero: async (
            _root: undefined,
            { input }: SuperheroArgs,
            { db }: { db: Database }
        ): Promise<Superhero> => {
            try {
                const insertResult = await db.superheros.insertOne({
                    _id: new ObjectId(),
                    ...input
                })

                if (!insertResult) {
                    throw new Error("failed to find superhero");
                }

                const insertedHero = insertResult?.ops[0]
                return insertedHero

            } catch (error) {
                throw new Error(`Error createSuperhero ${error}`)
            }
        },
        updateSuperhero: async (
            _root: undefined,
            { id, input },
            { db }: { db: Database }
        ): Promise<Superhero> => {
            try {
                await db.superheros.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { ...input } },
                )

                const result = await db.superheros.findOne({
                    _id: new ObjectId(id)
                })

                if (!result) {
                    throw new Error("failed to update superhero");
                }

                return result
            } catch (error) {
                throw new Error(`Error updateSuperhero ${error}`)
            }
        },
        deleteSuperhero: async (
            _root: undefined,
            { id }: ObjectId,
            { db }: { db: Database }
        ): Promise<Superhero> => {
            try {
                const deleteRes = await db.superheros.findOneAndDelete({
                    _id: new ObjectId(id),
                });

                if (!deleteRes.value) {
                    throw new Error("failed to delete superhero");
                }

                return deleteRes.value

            } catch (error) {
                throw new Error(`Error deleteSuperhero ${error}`)
            }
        }
    },
    Superhero: {
        id: (superhero: Superhero): string => superhero._id.toString(),
    },
}