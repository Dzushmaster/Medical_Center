import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {publicRoutes} from "../Routes";
import {Context} from "../index";

/*
            <!-- {authRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component={Component} exact/>
            )} -->
*/

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Switch>
            {publicRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component={Component} exact/>
            )}
        </Switch>
    );
};

export default AppRouter;