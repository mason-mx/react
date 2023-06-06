import React, { Component } from 'react';
import PxiePage from './pxie';
import Bladepage from './bladepage';
import {getData} from './fetch'
//import SwitchComponent from './switchcomponent';
import { ViewContext } from './viewcontext';

class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      view: 'home',
      platform: 'Unknown'
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
      view: 'device'
    })
  }

  clickHome() {
    this.setState({
      view: 'home'
    })
  }

  render() {
    const { error, isLoaded, platform, chassis, view } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if (platform === 'PXIE') {
        if (view === 'home') {
          return (
            <ViewContext.Provider value={{onChange: this.clickBlade}}>
              <PxiePage chassis={chassis}/>
            </ViewContext.Provider>
          )
        } else if (view === 'device') {
          return <div>Blade view...</div>;
        } else {
          return <h1>Current view is : {view}</h1>        
        }
      } else if (platform === 'MTRQ') {
        return <Bladepage />;
      } else if (platform === 'EPIQ') {
        return <div>EPIQ</div>;
      } else {
        return <div>Unknown platform!</div>;
      }
      // return (
      //   <SwitchComponent active={platform}>
      //     <PxiePage chassis={chassis} name='PXIE'/>
      //     <Bladepage name='MTRQ'/>
      //   </SwitchComponent>
      // )
    }
  }
}

export default Instrument;