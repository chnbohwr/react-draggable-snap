import React from "react";
import { DraggableCore } from "react-draggable";

export default class Device extends React.Component {
  onDragDevice = (e, coreData) => {
    const { id } = this.props.data;
    this.props.onDrag({
      id,
      deltaX: coreData.deltaX,
      deltaY: coreData.deltaY
    });
  };
  onDragStop = () => {
    const { id } = this.props.data;
    this.props.onDragStop(id);
  };
  render() {
    const { x, y, lockX, lockY } = this.props.data;
    return (
      <DraggableCore onDrag={this.onDragDevice} onStop={this.onDragStop}>
        <rect
          fill="skyblue"
          width="200"
          height="150"
          x={lockX ? lockX : x}
          y={lockY ? lockY : y}
        />
      </DraggableCore>
    );
  }
}
