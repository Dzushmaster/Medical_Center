import {
    CHAT_ROUTE,
    HOMEANALYSE_ROUTE,
    LOGIN_DEFAULT_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    VISIT_ROUTE
} from "./utils/consts";
import Home_analyse from "./pages/Home_analyse";
import Visit from "./pages/Visit";
import Login from "./pages/Login";

export const authRoutes = [
    {
        path: HOMEANALYSE_ROUTE,
        Component: Home_analyse
    },
    {
        path: VISIT_ROUTE,
        Component: Visit
    },
    {
        path: CHAT_ROUTE,
        Component: Login
    }
]
export const publicRoutes = [
    {
        path: LOGIN_DEFAULT_ROUTE,
        Component: Login
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTER_ROUTE,
        Component: Login
    }
]