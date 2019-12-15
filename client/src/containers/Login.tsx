import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { setAccessToken } from "../middleware/accessToken";

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [login] = useLoginMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await login({
            variables: {
                email,
                password
            },
            update: (store, { data }) => {
                if (!data) {
                    return null;
                }
                store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        me: data.login.user
                    }
                });
            }
        })
        console.log(response);
        if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
        };
        history.push("/");  // This will return us to homepage.
    };

    return (
        <React.Fragment>
            <h1 className="banner">Login</h1>
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
                <button type="submit">Login</button>
            </form>
        </React.Fragment>
    );
};

