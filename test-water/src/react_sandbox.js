'use strict';

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: "red"};
  }

  render() {
    return <h2>Hi, I am a {this.state.color} Car!</h2>;
  }
}

class Garage extends React.Component {
  render() {
    return (
      <div>
      <h1>Who lives in my Garage?</h1>
      <Car />
      </div>
    );
  }
}

let domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<Garage />, domContainer);
