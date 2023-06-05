import React, { Component } from 'react';
import PxiePage from './pxie';
import Bladepage from './bladepage';
import {getData} from './fetch'
import SwitchComponent from './switchcomponent';

class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      platform: 'PXIE'
    };

    this.clickBlade = this.clickBlade.bind(this);
    
    this.onFetchSuccess = this.onFetchSuccess.bind(this);
    this.onFetchFailure = this.onFetchFailure.bind(this);
  }

  componentDidMount() {
    getData("http://localhost/instrument", this.onFetchSuccess, this.onFetchFailure);
  }

  onFetchSuccess(result) {
    this.setState({
      isLoaded: true,
      platform: result.platform,
      chassis: result.chassis
    });
  }

  onFetchFailure(error) {
    this.setState({
      isLoaded: true,
      error
    });
  }

  clickBlade() {
    this.setState({
      isLoaded: false
    })
  }

  render() {
    const { error, isLoaded, platform, chassis } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <SwitchComponent active={platform}>
          <PxiePage chassis={chassis} name='PXIE'/>
          <Bladepage name='MTRQ'/>
        </SwitchComponent>
      )
    }
  }
}

export default Instrument;