import React from "react";
import "./FaceDetection.css";
import FaceDisplay from "../FaceDisplay/FaceDisplay";
import FaceCount from "../FaceCount/FaceCount";

const FaceDetection = ({ imgUrl, face, faceCount }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="image"
          alt={imgUrl ? "imageForDetection" : ""}
          src={imgUrl}
          width="500px"
          height="auto"
        />
        <div>
          {face.map((head, key) => {
            return <FaceDisplay head={head} key={key} />;
          })}
        </div>
      </div>
      <div className="faceCount pa3s">
        <FaceCount faceCount={faceCount} imgUrl={imgUrl} />
      </div>
    </div>
  );
};

export default FaceDetection;
