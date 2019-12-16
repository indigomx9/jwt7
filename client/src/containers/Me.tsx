import React from "react";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../middleware/accessToken";

export const Me = () => {
    const { data } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();

    return (
        <React.Fragment>
            {data && data.me ? (
                <main><h2>User email: {data.me.email}</h2></main>
            ) : <aside>not logged in</aside>}
            <button onClick={async () => {
                await logout();  // Clears the refresh token.
                setAccessToken("");  // Clears the access token.
                await client!.resetStore();
            }}>Logout</button>
        </React.Fragment>
    );
};


