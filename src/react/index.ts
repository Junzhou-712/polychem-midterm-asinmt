// application service
export * from "./Monopoly";
import { Application } from "pixi.js";
import { createMonopoly, Monopoly, moveMonopolys } from "./Monopoly";
import { moveCompound, Compound } from "./Compound";
import { polymerize } from "./Polymerization";

export let react: Application;

react = new Application({
  width: 1500,
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
  run(monopolys, compounds);

  return {
    monopolys,
    compounds,
  };
}

export function run(monopolys: Monopoly[], compounds: Compound[]) {
  react.ticker.add(() => {
    moveMonopolys(monopolys);
    moveCompound(compounds);
    polymerize(monopolys, compounds);
  });
}
