import { User } from "../models/User";
import { hash, compare } from "bcryptjs";
import { MyContext } from "../middleware/MyContext";
import { createRefreshToken, createAccessToken } from "../middleware/auth";
import { Resolver, Query, Mutation, Arg, ObjectType, 
    Field, Ctx } from "type-graphql";

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
        res.cookie("jid", createRefreshToken(user), { httpOnly: true });
        return {
            accessToken: createAccessToken(user)
        }
    }

    @Query(() => String)
    async hello() {
        return "JWT Token GraphQL"
    }

    @Query(() => [User])
    users() {
        return User.find();
    }
};


