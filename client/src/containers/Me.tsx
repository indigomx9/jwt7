import React from "react";
import { useMeQuery } from "../generated/graphql";

export const Me = () => {
    const { data } = useMeQuery();

    return (
        <React.Fragment>
            {data && data.me ? (
                <main><h2>User email: {data.me.email}</h2></main>
            ) : <aside>not logged in</aside>}
        </React.Fragment>
    );
};


