import React from 'react';
import Login from './components/Login/Login';
import { AuthenticationCallback } from "./components/Authentication/AuthenticationCallback/AuthenticationCallback";
import { AuthenticatedRoute } from "./components/Authentication/AuthenticatedRoute/AuthenticatedRoute";
import { Logout } from "./components/Authentication/Logout/Logout";
import { LogoutCallback } from "./components/Authentication/LogoutCallback/LogoutCallback";
import { AuthenticationSilentRenew } from "./components/Authentication/AuthenticationSilentRenew/AuthenticationSilentRenew";
import history from './services/history';
import { Router, Route } from "react-router-dom";
import Clients from './pages/Clients/Clients';
import NewClient from './pages/NewClient/NewClient';
import EditClient from './pages/EditClient/EditClient';
import { AuthenticationContextProvider } from './context/authentication';

function App() {
    return (
        <div className="App">
            <header className="psi-header">
            </header>
            <main className="psi-main">
                <AuthenticationContextProvider>
                    <Router history={history}>
                        <Route exact={true} path="/authenticate" component={AuthenticationCallback} name="callback" />
                        <Route exact={true} path="/logout" component={Logout} name="logout" />
                        <Route exact={true} path="/deauthenticate" component={LogoutCallback} name="logoutCallback" />
                        <Route exact={true} path="/silentRenew" component={AuthenticationSilentRenew} name="silentRenew" />
                        <Route exact={true} path="/" component={Login} name="login" />
                        <Route exact={true} path="/:tenant/admin" component={Login} name="loginWithTenant" />

                        <AuthenticatedRoute exact={true} path="/:tenant/admin/clients" component={Clients} name="clients" />
                        <AuthenticatedRoute exact={true} path="/:tenant/admin/client_details/:clientId" component={EditClient} name="editClientApplication" /> 
                        <AuthenticatedRoute exact={true} path="/:tenant/admin/client_onboarding" component={NewClient} name="newClientApplication" />

                    </Router>
                </AuthenticationContextProvider>
            </main>

        </div>
    );
}

export default App;
