import { Container, Sprite, Text, Texture, TextureSource } from "pixi.js";
import { Component, ComputedOptions, createRenderer, MethodOptions } from "vue";

const renderer = createRenderer<Container, Container>({
  createElement(type: string) {
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
  insert(el: any, parent: { addChild: (arg0: any) => void; }) {
    parent.addChild(el);
  },

  patchProp(el: any, key: string | number, _: any, nextValue: TextureSource | TextureSource[]) {
    console.log(key);
    switch (key) {
      case "texture":
        (el as Sprite).texture = Texture.from(nextValue);
        break;

      default:
        el[key] = nextValue;
        break;
    }
  },
  remove(el: { parent: { removeChild: (arg0: any) => void; }; }) {
    if (el.parent) {
      el.parent.removeChild(el);
    }
  },
  createText(text: string | number | undefined) {
    return new Text(text);
  },
  createComment(text: string | number | undefined) {
    return new Text(text);
  },
  setText() {},
  setElementText() {},
  parentNode(node: { parent: any; }) {
    return node.parent;
  },
  nextSibling() {
    return null;
  },
});

export function createApp(rootComponent: Component<any, any, any, ComputedOptions, MethodOptions>) {
  return renderer.createApp(rootComponent);
}