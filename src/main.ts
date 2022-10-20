// import { createApp } from "./renderer";
// import { getRootContainer } from "./react";
import App from "./App.vue";

// createApp(App).mount(getRootContainer());

import { Application,Container, Sprite, Text, Texture } from "pixi.js";

const react = new Application({
    width: 845,
    height: 500,
});

document.body.append(react.view);

import { createRenderer } from "vue";

const renderer = createRenderer<Container, Container>({
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
                throw new Error("${type} not exists");
                break;
        }
        return element;
    },
    insert(el, parent) {
        parent.addChild(el);
    },
    patchProp(el, key, prevValue, nextValue) {
        console.log(key);
        switch (key) {
          case "texture":
            (el as Sprite).texture = Texture.from(nextValue);
            break;
    
          default:
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
    setText() {},
    setElementText() {},
    parentNode(node) {
        return node.parent;
    },
    nextSibling(node) {
        return null;
    },
});

renderer.createApp(App).mount(react.stage);