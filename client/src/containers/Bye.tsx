import React from "react";
import { useByeQuery } from "../generated/graphql";
import { Me } from "./Me";

export const Bye = () => {
    const { data, loading, error } = useByeQuery();
    if (loading) {
        return <section>loading...</section>
    };
    if (error) {
        console.log(error)
        return <section>error</section>
    };
    if (!data) {
        return <div>no data</div>
    }

    return (
        <React.Fragment>
            <main><h2>{data.bye}</h2></main>
            <Me />
        </React.Fragment>
    );
};


