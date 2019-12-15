import React from "react";
import { Routes } from "../routes/Routes";
import { setAccessToken } from "./accessToken";

export const RefreshToken = () => {
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        fetch("http://localhost:9000/refresh_token", {
            method: "POST",
            credentials: "include"
        })
        .then(async(res) => {
            const { accessToken } = await res.json()
            setAccessToken(accessToken);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>loading...</div>
    };
    return (
        <Routes />
    );
};


