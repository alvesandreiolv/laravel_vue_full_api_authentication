<template>
    <span class="contrast" @click="toggleDark()" id="lightSwitch">
        <img src="../assets/images/lightSwitch.png" alt="Light Switch">
    </span>
</template>

<style>
#lightSwitch {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 20px;
    padding-top: 15px;
    border-radius: 1000px;
    filter: drop-shadow(3px 3px 5px #7979798a);
    cursor: pointer;
    width: auto;
    height: auto;
    transition: 0.1s;
    opacity: 0.5;
}

#lightSwitch:hover {
    transform: rotate(10deg);
    opacity: 1;
}

#lightSwitch:active {
    transform: rotate(30deg) !important;
}

#lightSwitch img {
    filter: invert(50%);
    user-select: none;
    width: 30px;
    height: 30px;
}
</style>

<script setup>
import { toggleDark } from '@/helpers/toggleDark.js';
</script>