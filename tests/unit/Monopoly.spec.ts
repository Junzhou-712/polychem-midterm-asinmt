import { Monopoly } from "@/react/Monopoly";
import { expect } from "chai";
import { describe } from "mocha";

describe("Monopoly.vue", () => {
  it("Monopoly move", () => {
    function createMonopoly() {
      const monopoly = new Monopoly();
      monopoly.speed = 1;
      return monopoly;
    }
    it("Monopoly can move"),
      () => {
        const monopoly = createMonopoly();

        monopoly.brownianMotion();

        expect(monopoly.x ^ monopoly.y).equal(1);
      };
  });
});
