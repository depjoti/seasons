import React from "react";
import ReactDom from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
import "./index.css";

class App extends React.Component {
  state = { lat: null, errorMessage: "" }; //state object

  componentDidMount() {
    // call geolocation API
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }
  renderContent() {
    //helper function
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <div className="error-display">
          <h1>Error: {this.state.errorMessage}</h1>
        </div>
      );
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please Accept Location Request" />;
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
