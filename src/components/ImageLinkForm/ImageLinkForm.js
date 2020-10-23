import React, { useState } from "react";
import Delete from "./delete.svg";
import "./ImageLinkForm.css";
import FaceDetection from "../FaceDetection/FaceDetection";

const ImageLinkForm = ({ serverURL, user, loadUser, onRouteChange }) => {
  const imageUrl = document.getElementById("imageUrl");
  const faces = [];
  const [detect, setDetect] = useState(false);
  const [input, setInput] = useState("");
  const [faceCount, setfaceCount] = useState(0);
  const [faceBoundaries, setFaceBoundaries] = useState([]);
  
  const onInputChange = (event) => {
    document.getElementById("image_upload").value=null;
    setDetect(false);
    setFaceBoundaries([]);
    setInput(event.target.value);
  };
  
  const onButtonClick = () => {
    if (detect) {
      return 0;
    }
    const credentials = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        input,
      }),
    };
    fetch(`${serverURL}/imageClarifai`, credentials)
      .then((res) => res.json())
      .then((response) => {
        calculateFaceLocation(response);
      })
      .then(() => {
        const credentials = {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            entries: faces.length,
          }),
        };
        fetch(`${serverURL}/image`, credentials)
          .then((res) => {
		  if(!res.ok) throw new Error(res.status);
		  else return res.json()
		  })
          .then((data) => {
           
              user.entries = data;
              loadUser(user);
            
            imageUrl.value = "";
          });
      });
  };

  const showImage = e => {
    console.log(e.target.files)
    console.log("2")
      let imageFile = e.target.files[0]

    if(!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)){
      window.alert("Kindly select the right image format.")
        return 0
    }

    if(imageFile){
      const reader = new FileReader()
      reader.onload = x => {
        setInput(x.target.result);
      }
      reader.readAsDataURL(imageFile)
    } else {
      setInput("");
    }
  }

  const del = () => {
	  let prompt = window.prompt(
                    "Please enter your username to confirm delete",
                    "Username"
                  )
    if (prompt === null || prompt === "") {
      return 0
    } else if (prompt.toLowerCase() !== user.name.toLowerCase()) {
		  return 0
	  }
	  
    const credentials = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    };
    fetch(`${serverURL}/deleteAccount`, credentials)
      .then((res) => {
		  if(!res.ok) throw new Error(res.status);
		else return res.json();
	  })
      .then((data) => {
          onRouteChange("signin");
        window.alert(data)
      });
  };

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("image");
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions;
    clarifaiFace.forEach((obj) => {
      faces.push({
        leftCol: obj.region_info.bounding_box.left_col * width,
        topRow: obj.region_info.bounding_box.top_row * height,
        rightCol: width - obj.region_info.bounding_box.right_col * width,
        bottomRow: height - obj.region_info.bounding_box.bottom_row * height,
      });
    });
    setFaceBoundaries(faces);
    setfaceCount(faces.length);
    setDetect(true);
  };

  return (
    <div className="wrapper" >
      <div >
        <p className="text"><strong>This detects faces in your pictures.</strong></p>
        <div className="center input">
          <div className="form center pa2 br3 shadow-5">
            <input
              className="f4  w-70 center"
              type="text"
              id="imageUrl"
              placeholder="Paste image url here"
              onChange={onInputChange}
            />
            <button
              className="w-30 grow f5 link ph3 pv2 dib white bg-light-purple"
              onClick={onButtonClick}
            >
              Detect
            </button>
          </div>
        </div>
        <div >
        <label className="image_upload" htmlFor="image_upload">... or Select an Image</label>
          <input type="file" accept="image/*" style={{visibility: "hidden"}}  id="image_upload"
            onChange={showImage}
          />
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
      <footer>
        <div className="footer">
          <p
            id="footer"
            className="pointer link white-60 hover-white inline-flex items-center ma2 tc br2 pa1"
            onClick={del}
          >
            <img src={Delete} alt="Delete Account" />
            <span className="f6 ml3 pr2">Delete Account</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ImageLinkForm;
