import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Navigate} from "react-router-dom";
function ProtectedRoute({children}) {
    const token = localStorage.getItem('access_token');
    return token ? children : <Navigate to={"/"} replace />
}

export default ProtectedRoute;
