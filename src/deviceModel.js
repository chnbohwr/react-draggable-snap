const model = {
  Wi001: {
    width: 200,
    height: 160
  },
  Wi002: {
    width: 300,
    height: 200
  }
};

export const innerShape = {
  magnetX: Number.MAX_SAFE_INTEGER,
  magnetY: Number.MAX_SAFE_INTEGER
};

const nearDistance = 15;

export default class DeviceModel {
  constructor(props) {
    this.x = props.x;
    this.y = props.x;
    this.id = props.id;
    this.model = props.model;
    this.calcModel();
    this.calcLayout();
  }

  calcModel() {
    if (model[this.model]) {
      this.width = model[this.model].width;
      this.height = model[this.model].height;
    }
  }

  calcLayout() {
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
  }

  move({ deltaX, deltaY, innerShapeDistance }) {
    if (Math.abs(innerShapeDistance.magnetX) < nearDistance) {
      this.lockX = this.x + innerShapeDistance.magnetX;
    } else {
      this.lockX = null;
    }
    if (Math.abs(innerShapeDistance.magnetY) < nearDistance) {
      this.lockY = this.y + innerShapeDistance.magnetY;
    } else {
      this.lockY = null;
    }
    this.x += deltaX;
    this.y += deltaY;
    this.calcLayout();
  }

  clearLock() {
    if (this.lockX) {
      this.x = this.lockX;
      this.lockX = null;
    }
    if (this.lockY) {
      this.y = this.lockY;
      this.lockY = null;
    }
    this.calcLayout();
  }
}
