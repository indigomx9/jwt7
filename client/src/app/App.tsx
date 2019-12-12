import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Routes } from "../routes/Routes";
import "./App.css";

const client = new ApolloClient({
    uri: "http://localhost:9000/graphql"
});

export const App = () => (
    <React.Fragment>
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    </React.Fragment>
);


