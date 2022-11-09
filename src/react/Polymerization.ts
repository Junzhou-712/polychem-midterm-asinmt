import { Compound } from "./Compound";
import { hitTestObject } from "./HitTestObject";
import { Monopoly } from "./Monopoly";

export function polymerize(monopoly: Monopoly[], compounds: Compound[]) {
    for(let i = 0; i < monopoly.length; ++i) {
        for(let j = i+1; j < monopoly.length; ++j) {
            if(hitTestObject(monopoly[i], monopoly[j])) {
                monopoly.splice(i,1);
                monopoly.splice(j,1);
                const compound = new Compound();
                compound.x = monopoly[i].x;
                compound.y = monopoly[i].y;
                compounds.push(compound);
            }
        }
    }
}