import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Home } from "../components/Home";
import { Register } from "../containers/Register";
import { Login } from "../containers/Login";

export const Routes = () => (
    <BrowserRouter>
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
        </React.Fragment>
    </BrowserRouter>
);


