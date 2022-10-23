// application service
export * from "./Monopoly";
import { Application } from "pixi.js";
import { Monopoly, moveMonopolys } from "./Monopoly";

export let react: Application;

react = new Application({
  width: 500,
  height: 500,
});

document.body.append(react.view);

export function getRootContainer() {
  return react.stage;
}
interface initReactResult {
  monopolys: Monopoly[];
}
type initReactOptions = {
  monopolys: Monopoly[];
};
export function initReact({ monopolys }: initReactOptions): initReactResult {
  run(monopolys);

  return {
    monopolys,
  };
}

export function run(monopolys: Monopoly[]) {
  react.ticker.add(() => {
    moveMonopolys(monopolys);
  });
}
