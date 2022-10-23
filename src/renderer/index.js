import { Container, Sprite, Text, Texture } from "pixi.js";
import { createRenderer } from "vue";
const renderer = createRenderer({
    createElement(type) {
        let element;
        switch (type) {
            case "Container":
                element = new Container();
                break;
            case "Sprite":
                element = new Sprite();
                break;
            default:
                throw new Error(`Not implemented ${type}`);
        }
        return element;
    },
    insert(el, parent) {
        parent.addChild(el);
    },
    patchProp(el, key, _, nextValue) {
        console.log(key);
        switch (key) {
            case "texture":
                el.texture = Texture.from(nextValue);
                break;
            default:
                el[key] = nextValue;
                break;
        }
    },
    remove(el) {
        if (el.parent) {
            el.parent.removeChild(el);
        }
    },
    createText(text) {
        return new Text(text);
    },
    createComment(text) {
        return new Text(text);
    },
    setText() { },
    setElementText() { },
    parentNode(node) {
        return node.parent;
    },
    nextSibling() {
        return null;
    },
});
export function createApp(rootComponent) {
    return renderer.createApp(rootComponent);
}
//# sourceMappingURL=index.js.map