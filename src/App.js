import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import {BrowserRouter} from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Privacy from "./Components/Privacy";
import home_back from './assets/home_back.png'
import SignUp from "./Components/SignUp";
import {Provider} from "react-redux";
import store from "./Components/Store";
const App = () => {
    return (
      <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Login />} />
                <Route path={"/about"} element={<About/>} />
                <Route path={"/contact"} element={<Contact/>} />
                <Route path={"/privacy"} element={<Privacy/>} />
                <Route path={"/sign-up"} element={<SignUp/>} />
                <Route
                    path={"/home/*"}
                    element={
                    <ProtectedRoute>
                        <Provider store={store}>
                            <Home/>
                        </Provider>
                    </ProtectedRoute>
                    }
                />
            </Routes>
      </BrowserRouter>
  );
};

export default App;
