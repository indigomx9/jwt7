import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/UserResolver";
import { createConnection } from "typeorm";
import { verify } from "jsonwebtoken";
import { User } from "./models/User";
import { createAccessToken, createRefreshToken } from "./middleware/auth";
import { sendRefreshToken } from "./middleware/sendRefreshToken";

(async () => {
    await createConnection();
    const app: express.Application = express();
    app.use(
        cors({
            origin: "http://localhost:8080",
            credentials: true
        })
    );
    app.use(cookieParser());

    // To refresh a JWT.
    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid
        if (!token) {
            return res.send({ ok: false, accessToken: "" })
        };
        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, accessToken: "" })
        };
        // Token is valid and we send back and access token.
        const user = await User.findOne({ id: payload.userId });
        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }
        sendRefreshToken(res, createRefreshToken(user));
        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });

    const apolloServer: ApolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ UserResolver ]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app, cors: false });

    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Press Ctrl + C to exit.`);
    })
})();


