import { createApp } from "./renderer";
import { getRootContainer } from "./react";
import App from "./App.vue";

createApp(App).mount(getRootContainer());

