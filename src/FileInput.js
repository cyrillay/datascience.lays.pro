import React from "react";
import Images from "./Images.js";

export default class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.getPredictions = this.getPredictions.bind(this);
    this.loadImages = this.loadImages.bind(this)
    this.fileInput = React.createRef();
    this.initialState = {
      images: [],
      imageFilesToPredictions: new Map()
    };
    this.state = this.initialState;
  }

  /**
   * Calls the inference-api back-end to classify the input images
   * and update the state with the returned predictions
   */
  async getPredictions(event) {
    event.preventDefault();

    const imageFilesToPredictions = new Map();
    for (const file of this.fileInput.files) {
      const payload = new FormData();
      payload.append("image", file);
      const response = await fetch("http://lays.pro:5000/predict", {
        method: "POST",
        body: payload
      });
      const jsonResponse = await response.json();
      imageFilesToPredictions.set(file, jsonResponse["predictions"][0]);
    }
    this.setState({
      imageFilesToPredictions: imageFilesToPredictions
    });
  }

  /**
   * Update the state with the loaded images from the user
   */
  loadImages() {
    this.setState(this.initialState);

    const files = Array.from(this.fileInput.files);
    // TODO : investigate a more efficient way of doing this (in parallel/using Promise.all...)
    files.forEach(file => {
      let reader = new FileReader();
      reader.onloadend = function(e) {
        this.setState({
          images: [
            ...this.state.images,
            { file: file, loadedFile: e.target.result }
          ]
        });
      }.bind(this);
      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.getPredictions}>
          <label>
            <br />
            <br />
            <h3 className="App-header">
              Submit a picture of an animal, flower or any object !
            </h3>
            <br />
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="validatedCustomFile"
                name="image"
                multiple
                ref={ref => {
                  this.fileInput = ref;
                }}
                onChange={this.loadImages}
              />
              <label className="custom-file-label">Choose file...</label>
              <div className="invalid-feedback">
                Example invalid custom file feedback
              </div>
            </div>
          </label>
          <br />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <br />
        <Images
          images={this.state.images}
          imagesAndPredictions={this.state.imageFilesToPredictions}
        />
      </div>
    );
  }
}
