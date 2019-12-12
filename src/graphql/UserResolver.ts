import { User } from "../models/User";
import { hash, compare } from "bcryptjs";
import { MyContext } from "../middleware/MyContext";
import { isAuth } from "../middleware/isAuth";
import { createRefreshToken, createAccessToken } from "../middleware/auth";
import { Resolver, Query, Mutation, Arg, ObjectType, Field, 
    Ctx, UseMiddleware, Int } from "type-graphql";
import { sendRefreshToken } from "../middleware/sendRefreshToken";
import { getConnection } from "typeorm";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
};

@Resolver()
export class UserResolver {
    @Mutation(() => Boolean)
    async register(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string
    ) {
        const hashedPassword = await hash(password, 12);
        try {
            await User.insert({
                email, 
                password: hashedPassword
            })
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(
        @Arg("userId", () => Int) userId: number
    ) {
        await getConnection()
            .getRepository(User)
            .increment({ id: userId }, "tokenVersion", 1);
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: {email} });
        if (!user) {
            throw new Error("User not found!")
        }
        const valid = await compare(password, user.password);
        if (!valid) {
            throw new Error("Wrong password!")
        }
        // Login Successful
        sendRefreshToken(res, createRefreshToken(user));
        return {
            accessToken: createAccessToken(user)
        }
    }

    @Query(() => String)
    async hello() {
        return "JWT Token GraphQL"
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(@Ctx() {payload}: MyContext) {
        console.log(payload);
        return `Your use id is: ${payload!.userId}`
    }

    @Query(() => [User])
    users() {
        return User.find();
    }
};


