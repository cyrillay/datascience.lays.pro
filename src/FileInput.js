import React from 'react';

export default class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('image', this.fileInput.files[0]);

    // TODO : make asynchronous call
    fetch('http://lays.pro:5000/predict', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        // var res = JSON.parse(body)
        console.log(body["predictions"][0]["label"])
        const prediction = body["predictions"][0]["label"]
        alert("Your image is : " + prediction)
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file: <br/>
          <input type="file" name="image" ref={(ref) => { this.fileInput = ref; }} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
