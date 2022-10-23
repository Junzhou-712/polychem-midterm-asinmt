export class Monopoly {
  public x = 0;
  public y = 0;
  public speed;
  public width = 0;
  public height = 0;

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
    const index = this.getRandomIndex();
    this.x += this._directionIndex[index][0] * this.speed;
    this.y += this._directionIndex[index][1] * this.speed;
    this.bounceBack();
  }

  private getRandomIndex() {
    return Math.floor(Math.random() * 4);
  }

  private bounceBack() {
    if (this.x > 500) {
      this.x -= this.speed;
    }
    if (this.x < 0) {
      this.x += this.speed;
    }
    if (this.y > 500) {
      this.y -= this.speed;
    }
    if (this.y > 0) {
      this.y += this.speed;
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
