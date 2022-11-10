import { Monopoly } from "./Monopoly";

export class Compound extends Monopoly {
    public x = Math.random();
    public y = Math.random();
    public speed = 5;

    constructor() {
        super();
    };
    
}

export function createCompound() {
    
}

export function moveCompound(compounds: Compound[]) {
    compounds.forEach((compound) => {
        compound.brownianMotion();
      });
}