import React from "react";
import { useUsersQuery } from "../generated/graphql";

export const Home = () => {
    const {data} = useUsersQuery({fetchPolicy: "network-only"});

    if (!data) {
        return <section>Loading...</section>
    }

    return (
        <React.Fragment>
            <h1 className="banner">Home</h1>
            <main>users: 
                <ul>
                    {data.users.map((user) => (
                        <li key={user.id}>{user.id}, {user.email}</li>
                    ))}
                </ul>
            </main>
        </React.Fragment>
    );
};


