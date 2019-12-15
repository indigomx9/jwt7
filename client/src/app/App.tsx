import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { RefreshToken } from "../middleware/RefreshToken";
import { getAccessToken } from "../middleware/accessToken";
import "./App.css";

const client = new ApolloClient({
    uri: "http://localhost:9000/graphql",
    credentials: "include",
    request: (operation) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            operation.setContext({
                headers: {
                    authorization: `bearer ${accessToken}`
                }
            })
        }
    }
});

export const App = () => (
    <React.Fragment>
        <ApolloProvider client={client}>
            <RefreshToken />
        </ApolloProvider>
    </React.Fragment>
);


