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
    const { x, y, lockX, lockY, width, height, id } = this.props.data;
    return (
      <DraggableCore onDrag={this.onDragDevice} onStop={this.onDragStop}>
        <g>
          <rect
            fill="skyblue"
            width={width}
            height={height}
            x={lockX ? lockX : x}
            y={lockY ? lockY : y}
          />
          <text x={lockX ? lockX : x} y={lockY ? lockY : y} fill="red">
            {id}
          </text>
        </g>
      </DraggableCore>
    );
  }
}
