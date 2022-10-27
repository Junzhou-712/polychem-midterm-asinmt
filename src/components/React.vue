<template>
    <Container>
        <template v-for="(monopolyItem, key) in monopolys" :key="key">
            <Monopoly :monopoly="monopolyItem"></Monopoly>
        </template>

        <template v-for="(compoundItem, key) in compounds" :key="key">
            <Compound :compound="compoundItem"></Compound>
        </template>
    </Container>
</template>

<script lang="ts" setup>
import Monopoly from "./Monopoly.vue";
import Compound from "./Compound.vue";
import { initReact } from "../react";
import { reactive } from "vue";
const {monopolys, compounds } = initReact({
    monopolys: reactive([]),
    compounds: reactive([]),
});


</script>