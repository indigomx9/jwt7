import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/UserResolver";
import { GraphQLSchema } from "graphql";
import { createConnection } from "typeorm";

(async () => {
    await createConnection();
    const app: express.Application = express();

    const schema: GraphQLSchema = await buildSchema({
        resolvers: [ UserResolver ]
    });

    const apolloServer: ApolloServer = new ApolloServer({ schema });
    apolloServer.applyMiddleware({ app });

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Press Ctrl + C to exit.`);
    })
})();


