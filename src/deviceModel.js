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

const nearDistance = 25;

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

  move({ deltaX, deltaY }) {
    this.x += deltaX;
    this.y += deltaY;
    this.calcLayout();
  }

  nearLeft(target) {
    if (Math.abs(this.left - target.left) < nearDistance) {
      console.log(true);
      return true;
    }
    return false;
  }

  magnetLeft(target) {
    this.x = target.x;
    this.left = target.left;
  }

  clearLock() {
    if (this.lockX) {
      this.x = this.lockX;
      this.lockX = 0;
    }
    if (this.lockY) {
      this.y = this.lockY;
      this.lockY = 0;
    }
  }
}
