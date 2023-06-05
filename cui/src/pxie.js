import React, { Component } from 'react';
//import ReactDOM from 'react-dom/client';
//import bladepage from './bladepage';

/*
class BladeCategoryRow extends Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}*/

class BladeRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClickBlade: null
    };
    this.onClickBlade = this.onClickBlade.bind(this);
  }

  onClickBlade() {
    if(typeof(this.props.onClickBlade) === 'function') {
        this.props.onClickBlade();
    }else{
        console.log("null function for form submit");
    }
    // const instr = ReactDOM.createRoot(document.getElementById('root'));
    // instr.render(
    //   <React.StrictMode>
    //     <bladepage />
    //   </React.StrictMode>
    // );
  }

  render() {
    const blade = this.props.blade;
    const model = (blade !== "None") ?
      <a href="#" onClick={this.onClickBlade}>{blade.model}</a> :
      <span style={{color: 'red'}}> Empth Slot </span>;
    const serial = (blade !== "None") ?
      blade.serial : "";

    return (
      <tr>
        <td>{model}</td>
        <td>{serial}</td>
      </tr>
    );
  }
}

class BladeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onBladeItem: null
    };
  }

  render() {
    const filterText = this.props.filterText;
    const showEmptySlot = this.props.showEmptySlot;

    const rows = [];
    //let lastCategory = null;
    let slotId = 0;

    this.props.blades.forEach((blade) => {
      if (blade !== "None") {
        if (blade.model.indexOf(filterText) === -1) {
          return;
        }
        //if (blade.company !== lastCategory) {
        //  rows.push(
        //    <BladeCategoryRow
        //      category={blade.company}
        //      key={blade.company}
        //    />
        //  );
        //}
      }
      if (!showEmptySlot && blade === "None") {
        return;
      }
      rows.push(
        <BladeRow
          blade={blade}
          key={slotId}
          onClickBlade={this.props.onBladeItem}
        />
      );
      //lastCategory = blade.company;
      slotId ++;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Model Name</th>
            <th>Model Number</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleshowHiddenChange = this.handleshowHiddenChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleshowHiddenChange(e) {
    this.props.onshowHiddenChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.showHidden}
            onChange={this.handleshowHiddenChange}
          />
          {' '}
          Show empty slot
        </p>
      </form>
    );
  }
}

class Chassis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      showEmptySlot: false,
      chassisMode: "SINGLE",
      blades: props.blades,
      onClickBlade: null
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleshowHiddenChange = this.handleshowHiddenChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleshowHiddenChange(showEmptySlot) {
    this.setState({
      showEmptySlot: showEmptySlot
    })
    // postData('https://jsonplaceholder.typicode.com/posts', {
    //   title: 'foo',
    //   body: 'bar',
    //   userId: 1
    // });
  }

  render() {
    const { blades } = this.state;
    return (
      <div className="col">
        <SearchBar
          filterText={this.state.filterText}
          showEmptySlot={this.state.showEmptySlot}
          onFilterTextChange={this.handleFilterTextChange}
          onshowHiddenChange={this.handleshowHiddenChange}
        />
        <BladeTable
          blades={blades}
          filterText={this.state.filterText}
          showEmptySlot={this.state.showEmptySlot}
          onBladeItem={this.props.onClickBlade}
        />
      </div>
    );
  }
}

class PxiePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var mutliChassis = [];
    for (var i = 0; i < this.props.chassis.length; i++) {
      mutliChassis.push(
        <Chassis
          blades={this.props.chassis[i].blades}
          key={i}
          onClickBlade={this.clickBlade}
        />);
    }
    return <div className='row'>{mutliChassis}</div>;
  }
}

export default PxiePage;
