import React from "react";
import serverErrorImage from "../../../assets/pages/ServerError/serverErrorImage.png";

function ServerError() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div
          className="flex justify-center items-center"
          style={{ height: "100vh" }}
        >
          <img
            src={serverErrorImage}
            alt="serverErrorImage"
            className="object-scale-down"
            style={{ height: "80vh" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ServerError;
