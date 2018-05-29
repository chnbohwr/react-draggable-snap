import React from "react";
import { render } from "react-dom";
import Device from "./device";
import DeviceModel, { getShapeDistance } from "./deviceModel";

const style = {
  svg: {
    backgroundColor: "lightyellow"
  }
};

const devicesRaw = [
  {
    id: "UROIDFW",
    x: 0,
    y: 0,
    angle: 0,
    model: "Wi002"
  },
  {
    id: "FEHRYSW",
    x: 300,
    y: 300,
    angle: 0,
    model: "Wi001"
  },
  {
    id: "JUTDWE",
    x: 500,
    y: 300,
    angle: 0,
    model: "Wi001"
  }
];

class App extends React.Component {
  state = {
    devices: devicesRaw.map(d => new DeviceModel(d))
  };
  onDrag = e => {
    const { deltaX, deltaY } = e;
    const { devices } = this.state;
    const nowDev = devices.find(d => d.id === e.id);
    const shapeDistance = getShapeDistance(devices, nowDev);
    nowDev.move({
      deltaX,
      deltaY,
      shapeDistance
    });
    this.setState({ devices });
  };
  onDragStop = id => {
    const nowDev = this.state.devices.find(d => d.id === id);
    nowDev.clearLock();
    this.setState({ devices: this.state.devices });
  };
  render() {
    const { devices } = this.state;
    return (
      <div>
        <svg width="800" height="800" style={style.svg}>
          {devices.map(d => (
            <Device
              key={d.id}
              data={d}
              onDrag={this.onDrag}
              onDragStop={this.onDragStop}
            />
          ))}
        </svg>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
