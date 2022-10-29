import { describe, it, expect } from "vitest";
import { Compound } from "../../src/react/Compound";

describe("Compound.vue", () => {
  it("Compound can create", () => {
    function createCompound() {
      const compound = new Compound();
      compound.speed = 1;
      compound.x = 0;
      compound.y = 0;
      return compound;
    }
    it("Compound can move", () => {
      const compound = createCompound();

      compound.brownianMotion();

      expect(compound.x ^ compound.y).equal(1);
    });
  });
});
