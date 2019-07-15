import React from "react";

// TODO : Split into smaller components
export default function Images(props) {
    if (props.images.length === 0) {
      console.log("No image to display");
      return null;
    } else {
      const images = props.images;
  
      return (
        <div className="row">
          {" "}
          {images.map(e => {
            return (
              <div
                key={e["file"].name}
                className="card mx-auto"
                style={{ width: "18rem" }}
              >
                <img
                  src={e["loadedFile"]}
                  className="card-img-top"
                  alt="File Reader not supported on this browser"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {props.imagesAndPredictions.size > 0 &&
                      props.imagesAndPredictions.get(e["file"])["label"]}
                  </h5>
                </div>
              </div>
            );
          })}{" "}
        </div>
      );
    }
  }