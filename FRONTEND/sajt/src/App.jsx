import React, {useState} from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from './pages/loginAndRegister/login';
import Home from './pages/Home/Home'
import "./style.css"
import Profile from './pages/profile/profile';
import ContextProvider from './context/stateContext';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee,faTimes,faB ,faRss} from '@fortawesome/free-solid-svg-icons'
import About from "./components/About/About";



function App() {
    library.add(fab, faCheckSquare, faCoffee,faTimes,fab,faRss)
    return (
        <Router>
            <ContextProvider>
                <Routes>
                    <Route
                        exact path = '/'
                        element ={<Home />}

                    />
                    <Route
                        exact path="/login"
                        element= {<Login />}
                    />
                    <Route
                        exact path="/:username"
                        element= {<Profile />}
                    />
                    <Route
                        path="*"
                        element={
                            <div>
                                <h1>404 - Page does not exist</h1>
                                <a href='/'>Back to home</a>
                            </div>
                        }
                    />
                </Routes>
            </ContextProvider>
            {//<ToastContainer  />
            }
        </Router>
    );
}

export default App;