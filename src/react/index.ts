// application service
export * from "./Monopoly";
import { Application } from "pixi.js";
import { createMonopoly, Monopoly, moveMonopolys } from "./Monopoly";
import { createCompound, moveCompound, Compound } from "./Compound";

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
  compounds: Compound[];
}
type initReactOptions = {
  monopolys: Monopoly[];
  compounds: Compound[];
};
export function initReact({ monopolys, compounds }): initReactResult {
  createMonopoly(monopolys);
  run(monopolys);

  return {
    monopolys,
    compounds,
  };
}

export function run(monopolys: Monopoly[]) {
  react.ticker.add(() => {
    moveMonopolys(monopolys);
  });
}
