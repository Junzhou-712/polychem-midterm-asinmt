import { Monopoly, createMonopoly } from "../../src/react/Monopoly";
import { expect, describe, it, vi } from "vitest";

describe("Monopoly.vue", () => {
  it("Monopoly move", () => {
    function createMonopoly() {
      const monopoly = new Monopoly();
      monopoly.speed = 1;
      monopoly.x = 0;
      monopoly.y = 0;
      return monopoly;
    }
    it("Monopoly can move"),
      () => {
        const monopoly = createMonopoly();

        monopoly.brownianMotion();

        expect(monopoly.x ^ monopoly.y).equal(1);
      };
  });
  it("Monopoly can create automatically", () => {
    vi.useFakeTimers();
    const monopolys = [];
    createMonopoly(monopolys);
    vi.advanceTimersByTime(4000);
    expect(monopolys.length).toBe(4);
    vi.resetAllMocks();
  });
});
