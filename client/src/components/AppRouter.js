import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {publicRoutes} from "../Routes";
import {Context} from "../index";
import {VISIT_ROUTE} from "../utils/consts";
const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Switch>
            {publicRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component={Component} exact/>
            )}
            <Redirect to={VISIT_ROUTE}/>
        </Switch>
    );
};
export default AppRouter;