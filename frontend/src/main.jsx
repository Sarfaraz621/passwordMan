import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.REACT_APP_AUTH0_CLIENT_ID;
const auth0Config = {
  domain: domain,
  clientId: clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};

const AppWrapper = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h1>Hello</h1>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )
    );
  }

  //return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider {...auth0Config}>
    <AppWrapper />
  </Auth0Provider>
);
