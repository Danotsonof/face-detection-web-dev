import React from "react";
import "./FaceCount.css";

const FaceCount = ({ faceCount, imgUrl }) => {
  return imgUrl ? (
    <div>
      <div className="white f3">
        {`${faceCount} face${faceCount === 1 ? "" : "s"} detected`}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default FaceCount;
