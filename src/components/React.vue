<template>
    <Container>
        <template v-for="(monopolyItem, key) in monopolys" :key="key">
            <Monopoly :monopoly="monopolyItem"></Monopoly>
        </template>
    </Container>
</template>

<script lang="ts" setup>
import Monopoly from "./Monopoly.vue";
import { initReact } from "../react";
import { reactive } from "vue";
const {monopolys} = initReact({
    monopolys: reactive([]),
});


</script>