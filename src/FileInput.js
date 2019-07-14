import React from "react";

export default class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.initialState = { output: "Press submit to discover the prediction !", image: undefined };
    this.state = this.initialState;
  }
  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();

    // TODO : add multi-file support
    console.log(this.fileInput.files);
    Array.from(this.fileInput.files).forEach(element => {
      console.log("ok, elem = " + element);
    });

    data.append("image", this.fileInput.files[0]);

    const response = await fetch("http://lays.pro:5000/predict", {
      method: "POST",
      body: data
    });
    const body = await response.json();

    console.log(body["predictions"][0]["label"]);
    const prediction = body["predictions"][0]["label"];
    this.setState({ output: "Your image was classified as : " + prediction });
  }

  displayImage() {
    this.setState(this.initialState);
    var file = this.fileInput.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      this.setState({
        image: [reader.result]
      });
    }.bind(this);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
                multiple=""
                ref={ref => {
                  this.fileInput = ref;
                }}
                onChange={this.displayImage.bind(this)}
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
        <Image image={this.state.image} prediction={this.state.output} />
      </div>
    );
  }
}

function Image(props) {
  if (props.image === undefined) {
    return null;
  } else
    return (
      <div className="card mx-auto" style={{ width: "18rem" }}>
        <img
          src={props.image}
          className="card-img-top"
          alt="File Reader not supported on this browser"
        />
        <div className="card-body">
          <h5 className="card-title">{props.prediction}</h5>
        </div>
      </div>
    );
}
