import React, { ReactElement } from 'react';
import {
    BrowserRouter as Router
} from "react-router-dom";
import Layout from './Layout';
import NavBar from './navbar-component/NavBar';
import Routes from './Routes';

export default function App(): ReactElement {

    return (
        <Router>
            <Layout>
                <Routes />
            </Layout>
        </Router>
    );
}

