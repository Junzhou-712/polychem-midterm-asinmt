<template>
    <Container :x="monopoly.x" :y="monopoly.y">
        <Sprite :texture="decomposeImg"></Sprite>
    </Container>
</template>

<script lang="ts" setup>
import { PropType, } from "vue";
import decomposeImg from "../assets/decompose.png";
import { Monopoly } from "../react/Monopoly";


const { monopoly } = defineProps({
    monopoly: {
        type: Object as PropType<Monopoly>,
        required: true,
    },
});
</script>

<style scoped>
.Monopoly {
    width: 20px;
    height: 20px;
}
</style>