import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DoctorStore from "./store/DoctorStore";
import VisitStore from "./store/VisitStore";
export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value = {{
        user: new UserStore(),
        doctor: new DoctorStore(),
        visit: new VisitStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
)