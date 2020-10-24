import React, { useState } from "react";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";
import Particles from "react-particles-js";

// Parameters for the Particles library
const particles = {
  particles: {
    number: {
      value: 150,
    },
    size: {
      value: 2,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
    },
  },
};

const App = () => {
  // For development mode on local machine use:
  // const serverURL = 'http://localhost:3000'
  // For deployment on heroku, use below
  const serverURL = 'https://radiant-depths-36646.herokuapp.com'
  const [route, setRoute] = useState("signin");
  const [navItem, setNavItem] = useState("Register");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });
  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onRouteChange = (path) => {
    setRoute(path);
  };

  return (
    <ErrorBoundary>      
    <div className="App">
      <Particles className="particles" params={particles} />
      <Logo
        onRouteChange={onRouteChange}
        navItem={navItem}
        setNavItem={setNavItem}
      />
      {route === "signin" ? (
        <div>
          <SignIn
		    serverURL={serverURL}
            onRouteChange={onRouteChange}
            setNavItem={setNavItem}
            loadUser={loadUser}
          />
        </div>
      ) : route === "reg" ? (
        <div>
          <Register
		  serverURL={serverURL}
		  onRouteChange={onRouteChange} 
		  setNavItem={setNavItem} />
        </div>
      ) : (
        <div className="home_wrapper">
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
		    serverURL={serverURL}
            loadUser={loadUser}
            user={user}
            onRouteChange={onRouteChange}
          />
        </div>
      )}
    </div>
    </ErrorBoundary>
  );
};

export default App;
