export class Monopoly {
  public x = 0;
  public y = 0;
  public speed;
  public width = 0;
  public height = 0;
  public index = this.getRandomIndex();

  constructor() {
    this.speed = 5;
  }
  private _directionIndex = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  public brownianMotion() {
    this.x += this._directionIndex[this.index][0] * this.speed;
    this.y += this._directionIndex[this.index][1] * this.speed;
    this.bounceBack();
  }

  private getRandomIndex() {
    return Math.floor(Math.random() * 4);
  }

  private bounceBack() {
    if (this.x > 500) {
      this.index = 1;
    }
    if (this.x < 0) {
      this.index = 0;
    }
    if (this.y > 500) {
      this.index = 3;
    }
    if (this.y > 0) {
      this.index = 2;
    }
  }
}

export function createMonopoly(monopolys: Monopoly[]) {
  setInterval(() => {
    const monopoly = new Monopoly();
    monopolys.push(monopoly);
  }, 1000);
}

export function moveMonopolys(monopolys: Monopoly[]) {
  monopolys.forEach((monopoly) => {
    monopoly.brownianMotion();
  });
}
