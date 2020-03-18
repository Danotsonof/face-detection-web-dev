import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceDetection from "./components/FaceDetection/FaceDetection";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import "./App.css";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const APIKEY = '' //insert your Api Key here

const app = new Clarifai.App({
  apiKey: APIKEY
});

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

function App() {
  const [input, setInput] = useState("");
  const [imgUrl, setUrl] = useState("");
  const [face, setFaceBoundaries] = useState([]);
  const [faceCount, setFaces] = useState(0);
  const [route, setRoute] = useState("signin");

  const calculateFaceLocation = data => {
    const faces = [];
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions;
    clarifaiFace.forEach(obj => {
      faces.push({
        leftCol: obj.region_info.bounding_box.left_col * width,
        topRow: obj.region_info.bounding_box.top_row * height,
        rightCol: width - obj.region_info.bounding_box.right_col * width,
        bottomRow: height - obj.region_info.bounding_box.bottom_row * height
      });
    });
    setFaces(faces.length);
    return setFaceBoundaries(faces);
  };

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const onRouteChange = path => {
    setRoute(path);
  };

  const onButtonClick = () => {
    setFaceBoundaries([]);
    setUrl(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      function(response) {
        calculateFaceLocation(response);
      },
      function(err) {
        // there was an error
      }
    );
  };

  return (
    <div className="App">
      <Particles className="particles" params={particles} />
      {route === "signin" ? (
        <div>
          <Logo />
          <SignIn onRouteChange={onRouteChange} />
        </div>
      ) : route === "reg" ? (
        <div>
          <Logo />
          <Register onRouteChange={onRouteChange} />
        </div>
      ) : (
        <div>
          <Navigation onRouteChange={onRouteChange} />
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonClick={onButtonClick}
          />
          <FaceDetection imgUrl={imgUrl} face={face} faceCount={faceCount} />
        </div>
      )}
    </div>
  );
}

export default App;
