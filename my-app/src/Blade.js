import React, { Component } from 'react';

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
  render() {
    const blade = this.props.blade;
    const model = (blade !== "None") ?
      blade.model :
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

export default BladeTable;
