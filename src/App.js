import React from "react";
import "./App.css";
import FileInput from "./FileInput.js";

export default class App extends React.Component {
  render() {
    return (
      <div className = "App">
          <FileInput />
      </div>
    );
  }
}
