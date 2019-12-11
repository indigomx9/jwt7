import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../models/User";
import { hash } from "bcryptjs";

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

    @Query(() => String)
    async hello() {
        return "JWT Token GraphQL"
    }

    @Query(() => [User])
    users() {
        return User.find();
    }
};


