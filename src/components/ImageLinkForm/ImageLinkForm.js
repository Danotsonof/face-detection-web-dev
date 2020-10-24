import React, { useState } from "react";
import Delete from "./delete.svg";
import "./ImageLinkForm.css";
import FaceDetection from "../FaceDetection/FaceDetection";

const ImageLinkForm = ({ serverURL, user, loadUser, onRouteChange }) => {
  // Scoped Variables 
  const imageUrl = document.getElementById("imageUrl");
  const faces = [];
  const [detect, setDetect] = useState(false);
  const [input, setInput] = useState("");
  const [faceCount, setfaceCount] = useState(0);
  const [faceBoundaries, setFaceBoundaries] = useState([]);
  
  // Detects changes in image url
  const onInputChange = (event) => {
    setDetect(false);
    setFaceBoundaries([]);
    setInput(event.target.value);
  };
  
  // Checks for faces on image
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

  // Loads image from public folder
  const showImage = e => {
    setDetect(false);
    setFaceBoundaries([]);

    let imageFile = e.target.files[0]
    
    if(imageFile == null) return 0

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

  // Deletes user account
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

  // Calculates the location of faces detected
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
        <small className="f6 red db mb2"><strong>Paste the URL of an image or upload an image from your PC.</strong></small>
        <small className="f6 red db mb2"><strong>Then click on the Detect button.</strong></small>
        <small className="f6 red db mb2">Image should contain human faces.</small>
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
        <label className="image_upload" htmlFor="image_upload">Select an Image</label>
          <input type="file" accept="image/*" style={{display: "none"}}  id="image_upload"
            onChange={showImage}
          />
        </div>
      </div>
        <FaceDetection
          imgUrl={input}
          faceCount={faceCount}
          face={faceBoundaries}
          detect={detect}
        />
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
