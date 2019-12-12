import express from "express";

export const sendRefreshToken = (
    res: express.Response,
    token: string
) => {
    res.cookie("jid", token, {
        httpOnly: true
    });
};


