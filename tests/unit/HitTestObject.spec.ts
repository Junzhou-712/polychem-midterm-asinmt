import { test, expect } from "vitest";
import {hitTestObject} from "../../src/react/HitTestObject"

test("Two rectangles can polymerize to be a new one when hit", () => {
  const rectA = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  };

  const rectB = {
    x: 25,
    y: 0,
    width: 100,
    height: 100,
  };

  const r = hitTestObject(rectA, rectB);

  expect(r).toBe(true);
});
