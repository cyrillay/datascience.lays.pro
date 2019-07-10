import React from "react";

export default class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();

    // TODO : add multi-file support
    console.log(this.fileInput.files)
    Array.from(this.fileInput.files).forEach(element => {
      console.log("ok, elem = " + element)
    });

    data.append("image", this.fileInput.files[0]);

    const response = await fetch("http://lays.pro:5000/predict", {
      method: "POST",
      body: data
    });
    const body = await response.json();

    console.log(body["predictions"][0]["label"]);
    const prediction = body["predictions"][0]["label"];
    alert("Your image is : " + prediction);
  }

  // render() {
  //   return (
  //     <form onSubmit={this.handleSubmit}>
  //       <label>
  //         <br/><br/>
  //         <h3 className="App-header">Submit a picture of an animal, flower or any object !</h3> <br />
  //         <input
  //           className="custom-file-input"
  //           type="file"
  //           name="image"
  //           multiple=""
  //           ref={ref => {
  //             this.fileInput = ref;
  //           }}
  //         />
  //       </label>
  //       <br />
  //       <button className="btn btn-primary" type="submit">Submit</button>
  //     </form>
  //   );
  // }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <br/><br/>
          <h3 className="App-header">Submit a picture of an animal, flower or any object !</h3> <br />

          <div class="custom-file">
            <input type="file" class="custom-file-input" id="validatedCustomFile" name="image"
            multiple=""
            ref={ref => {
              this.fileInput = ref;
            }}
          />
            <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
            <div class="invalid-feedback">Example invalid custom file feedback</div>
          </div>

        </label>
        <br />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }
}
