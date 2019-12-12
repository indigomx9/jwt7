import React from "react";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";

export const Register: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [register] = useRegisterMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await register({
            variables: {
                email,
                password
            }
        })
        console.log(response);
        history.push("/");  // This will return us to homepage.
    };

    return (
        <React.Fragment>
            <h1 className="banner">Register</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    <input 
                        value={email}
                        placeholder="email"
                        onChange={(event) => {setEmail(event.target.value)}}
                    />
                </section>
                <section>
                    <input 
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </section>
                <button type="submit">Register</button>
            </form>
        </React.Fragment>
    );
};


