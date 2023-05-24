import React, { Component } from 'react';
import Chassis from './Chassis';
import {getData} from './Fetch'

class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      chassis: []
    };
    
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.onFetchFailure = this.onFetchFailure.bind(this);
  }

  componentDidMount() {
    getData("http://localhost/instrument", this.onFetchSuccess, this.onFetchFailure);
  }

  onFetchSuccess(result) {
    this.setState({
      isLoaded: true,
      chassis: result.chassis
    });
  }

  onFetchFailure(error) {
    this.setState({
      isLoaded: true,
      error
    });
  }

  render() {
    const { error, isLoaded, chassis } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var mutliChassis = [];
      for (var i = 0; i < chassis.length; i++) {
        mutliChassis.push(
          <Chassis
            blades={chassis[i].blades}
            isLoaded={true}
          />);
      }
      return mutliChassis;
    }
  }
}

export default Instrument;