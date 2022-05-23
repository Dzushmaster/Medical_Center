import {
    CHAT_ROUTE,
    HOMEANALYSE_ROUTE,
    LOGIN_DEFAULT_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    VISIT_ROUTE,
    CONSULTATION_ROUTE, DOCTOR_ROUTE
} from "./utils/consts";
import Home_analyse from "./pages/Home_analyse";
import Visit from "./pages/Visit";
import Login from "./pages/Login";
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'
import VisitPage from "./pages/VisitPage";

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
        path: CONSULTATION_ROUTE,
        Component: Join
    },
    {
        path: CHAT_ROUTE,
        Component: Chat
    },
    {
        path: DOCTOR_ROUTE + '/:id',
        Component: VisitPage
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