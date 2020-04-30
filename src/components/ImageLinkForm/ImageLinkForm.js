import React, { useState } from "react";
import "./ImageLinkForm.css";
import FaceDetection from "../FaceDetection/FaceDetection";

const ImageLinkForm = ({ user, loadUser }) => {
  const imageUrl = document.getElementById("imageUrl");
  const faces = [];
  const [detect, setDetect] = useState(false);
  const [input, setInput] = useState("");
  const [faceCount, setfaceCount] = useState(0);
  const [faceBoundaries, setFaceBoundaries] = useState([]);
  const onInputChange = event => {
    setDetect(false);
    setFaceBoundaries([]);
    setInput(event.target.value);
    console.log(1, event.target.value)
  };
  const onButtonClick = () => {
    if (detect) {
      return 0
    }
    console.log(2, input)
    const credentials = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        input
      })
    };
    fetch(`http://localhost:3001/imageClarifai`, credentials)
      .then(res => res.json())
      .then(response => {
        calculateFaceLocation(response);
      })
      .then(() => {
        const credentials = {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            email: user.email,
            entries: faces.length
          })
        };
        fetch(`http://localhost:3001/image`, credentials)
          .then(res => res.json())
          .then(data => {
            if (data !== "unable to get entries") {
              user.entries = data;
              loadUser(user);
            }
            imageUrl.value = ''
          });
      });
  };
  const calculateFaceLocation = data => {
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
    setFaceBoundaries(faces);
    setfaceCount(faces.length);
    setDetect(true);
  };
  return (
    <div>
      <div>
        <p className="f3">{"This detects faces in your pictures."}</p>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input
              className="f4 pa2 w-70 center"
              type="text"
              id="imageUrl"
              onChange={onInputChange}
            />
            <button
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
              onClick={onButtonClick}
            >
              Detect
            </button>
          </div>
        </div>
      </div>
      <div>
        <FaceDetection
          imgUrl={input}
          faceCount={faceCount}
          face={faceBoundaries}
          detect={detect}
        />
      </div>
    </div>
  );
};

export default ImageLinkForm;
