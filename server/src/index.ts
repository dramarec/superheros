import dotenv from "dotenv"
dotenv.config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './db';
import { typeDefs, resolvers } from './graphql';

const envChecks = () => {
    if (!process.env.DB_HOST) {
        throw new Error('[APP]: DB_HOST must be defined');
    }
    if (!process.env.PORT) {
        throw new Error('[APP]: PORT must be defined');
    }
    if (!process.env.DB_USER) {
        throw new Error('[APP]: DB_USER must be defined');
    }
    if (!process.env.DB_USER_PASSWORD) {
        throw new Error('[APP]: DB_USER_PASSWORD must be defined');
    }
    if (!process.env.DB_CLUSTER) {
        throw new Error('[APP]: DB_CLUSTER must be defined');
    }
};

envChecks();

const mount = async (app: Application) => {
    const db = await connectDatabase();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({
            db, req, res
        }),

        formatError: (error) => {
            return {
                message: error.message
            };
        }
    });

    server.applyMiddleware({ app, path: '/api' });
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server ready at : http://localhost:${process.env.PORT}/api/`);
    });
}

mount(express());
