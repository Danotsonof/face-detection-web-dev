import React, { useState } from "react";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import "./App.css";
import Particles from "react-particles-js";


const particles = {
  particles: {
    number: {
      value: 200
    },
    size: {
      value: 5
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
};

const App = () => {
  const [route, setRoute] = useState("signin");
  const [navItem, setNavItem] = useState("Register");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  });
  const loadUser = data => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    });
  };
  
  const onRouteChange = path => {
    setRoute(path);
  };
  
  return (
    <div className="App">
      <Particles className="particles" params={particles} />
        <Logo onRouteChange={onRouteChange} navItem={navItem} setNavItem={setNavItem}/>
      {route === "signin" ? (
        <div>
          <SignIn onRouteChange={onRouteChange} setNavItem={setNavItem} loadUser={loadUser} />
        </div>
      ) : route === "reg" ? (
        <div>
          <Register onRouteChange={onRouteChange} setNavItem={setNavItem}/>
        </div>
      ) : (
        <div>
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            loadUser={loadUser}
            user={user}
          />
        </div>
      )}
    </div>
  );
};

export default App;
