<template>
    <Container :x="compound.x" :y="compound.y">
        <Sprite :texture="compoundImg"></Sprite>
    </Container>
</template>

<script lang="ts" setup>
import { Container, Sprite } from "pixi.js";
import { PropType } from "vue";
import { Compound } from "../react/Compound";
import compoundImg from "../assets/compound-2.png";
const { compound } = defineProps({
    compound: {
        type: Object as PropType<Compound>,
        required: true,
    },
});
</script>

<style scoped>

</style>