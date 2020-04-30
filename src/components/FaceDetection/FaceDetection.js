import React from "react";
import "./FaceDetection.css";
import FaceDisplay from "../FaceDisplay/FaceDisplay";
import FaceCount from "../FaceCount/FaceCount";

const FaceDetection = ({ imgUrl, faceCount, face, detect }) => {
  return (
    <div
      className="center"
      style={{
        padding: "1em"
      }}>

      <FaceCount faceCount={faceCount} detect={detect} />
      <div
        style={{
          position: "fixed",
          marginTop: "4em",
        }}
      >
        <img
          id="image"
          className="w-100 f5 measure"
          alt={detect ? "imageForDetection" : ""}
          src={imgUrl}
          width="500px"
          height="auto"
        />
        {face.map((head, key) => {
          return <FaceDisplay head={head} key={key} />;
        })}
      </div>

    </div>
  );
};

export default FaceDetection;
