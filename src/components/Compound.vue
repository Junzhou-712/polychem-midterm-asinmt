<template>
    <Container>
        <Sprite :texture="compoundImg"></Sprite>
    </Container>
</template>

<script lang="ts">
import { Container, Sprite } from "pixi.js";
import { PropType } from "vue";
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