import React from "react";
import "../FaceDetection/FaceDetection.css";

// Displays box around the faces detected
const FaceDisplay = ({ head }) => {
  return (
    <div
      className="bounding-box"
      style={{
        position: "absolute",
        top: head.topRow,
        right: head.rightCol,
        bottom: head.bottomRow,
        left: head.leftCol
      }}
    ></div>
  );
};

export default FaceDisplay;
