import React from "react";
import { DraggableCore } from "react-draggable";

const lineStyle = {
  stroke: "lightcoral",
  strokeWidth: 1,
  strokeDasharray: 5.5
};

export default class Device extends React.Component {
  onDragDevice = (e, coreData) => {
    const { id } = this.props.data;
    this.props.onDrag({
      id,
      deltaX: coreData.deltaX,
      deltaY: coreData.deltaY
    });
  };
  shouldComponentUpdate(nextProp) {
    if (nextProp.data.id === this.props.data.id) {
      return true;
    }
    return false;
  }
  onDragStop = () => {
    const { id } = this.props.data;
    this.props.onDragStop(id);
  };
  render() {
    const { x, y, lockX, lockY, width, height, id, isMoving } = this.props.data;
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
          {isMoving && [
            <line
              key="line1"
              y1="0"
              y2="1000"
              x1={lockX ? lockX : x}
              x2={lockX ? lockX : x}
              style={lineStyle}
            />,
            <line
              key="line2"
              y1="0"
              y2="1000"
              x1={lockX ? lockX + width : x + width}
              x2={lockX ? lockX + width : x + width}
              style={lineStyle}
            />,
            <line
              key="line3"
              x1="0"
              x2="1000"
              y1={lockY ? lockY + height : y + height}
              y2={lockY ? lockY + height : y + height}
              style={lineStyle}
            />,
            <line
              key="line4"
              x1="0"
              x2="1000"
              y1={lockY ? lockY : y}
              y2={lockY ? lockY : y}
              style={lineStyle}
            />
          ]}
        </g>
      </DraggableCore>
    );
  }
}
