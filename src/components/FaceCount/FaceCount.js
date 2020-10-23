import React from "react";

// Displays the number of faces detected on Image
const FaceCount = ({ faceCount, detect }) => {
  return (
    <div
      style={{
        position: "static",
      }}>
      {detect ? (
        <h2 className="white f3">
          {`${faceCount} face${faceCount === 1 ? "" : "s"} detected`}
        </h2>
      )
        : (<h1>&nbsp;</h1>)}
    </div>
  )
};

export default FaceCount;
