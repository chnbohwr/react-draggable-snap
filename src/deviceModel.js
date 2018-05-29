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

const nearDistance = 15;

export const getShapeDistance = (devices, nowDevice) => {
  const shapeDistance = devices
    .filter(d => d.id !== nowDevice.id && d.angle === 0)
    .reduce(
      (acc, d) => {
        const topToTop = d.top - nowDevice.top;
        const bottomToBottom = d.bottom - nowDevice.bottom;
        const leftToLeft = d.left - nowDevice.left;
        const rightToRight = d.right - nowDevice.right;
        const topToBottom = d.top - nowDevice.bottom;
        const bottomToTop = d.bottom - nowDevice.top;
        const leftToRight = d.left - nowDevice.right;
        const rightToLeft = d.right - nowDevice.left;
        const magnetY = closestZero([
          topToTop,
          bottomToBottom,
          topToBottom,
          bottomToTop
        ]);
        const magnetX = closestZero([
          leftToLeft,
          leftToRight,
          rightToLeft,
          rightToRight
        ]);
        if (Math.abs(magnetX) < Math.abs(acc.magnetX)) {
          acc.magnetX = magnetX;
        }
        if (Math.abs(magnetY) < Math.abs(acc.magnetY)) {
          acc.magnetY = magnetY;
        }
        return acc;
      },
      { magnetX: Number.MAX_SAFE_INTEGER, magnetY: Number.MAX_SAFE_INTEGER }
    );
  return shapeDistance;
};

const closestZero = nums => {
  return nums.reduce((acc, num) => {
    if (Math.abs(num) < Math.abs(acc)) {
      acc = num;
    }
    return acc;
  }, Number.MAX_SAFE_INTEGER);
};

export default class DeviceModel {
  constructor(props) {
    this.angle = props.angle;
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

  move({ deltaX, deltaY, shapeDistance }) {
    if (Math.abs(shapeDistance.magnetX) < nearDistance) {
      this.lockX = this.x + shapeDistance.magnetX;
    } else {
      this.lockX = null;
    }
    if (Math.abs(shapeDistance.magnetY) < nearDistance) {
      this.lockY = this.y + shapeDistance.magnetY;
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
