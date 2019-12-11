import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/UserResolver";
import { createConnection } from "typeorm";

(async () => {
    await createConnection();
    const app: express.Application = express();

    const apolloServer: ApolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ UserResolver ]
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app });

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Press Ctrl + C to exit.`);
    })
})();


