import { describe, it } from "vitest";
import { Compound } from "../../src/react/Compound";

describe("Compound.vue", () => {
  it("Compound can create", () => {
    function createCompound() {
      const compound = new Compound();
      compound.speed = 1;
      return compound;
    }
    it("Compound can move", () => {
        const compound = createCompound();
        compound.
    })
  });

});
