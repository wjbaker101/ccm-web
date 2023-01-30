<template>
    <header role="banner">
        <div class="flex gap-small">
            <div class="flex-auto">
                <strong>Custom Crosshair Mod Stats</strong>
            </div>
            <div class="flex gap-small flex-auto">
                <label>
                    <input type="checkbox" v-model="isFullDataEnabled">
                    <span>Show Full History</span>
                </label>
                <div>
                    <select v-model="dataToDisplay">
                        <option value="pastebinUsages">Pastebin Usages</option>
                        <option value="curseForgeTotalDownloads">CurseForge Total Downloads</option>
                        <option value="modrinthTotalDownloads">Modrinth Downloads</option>
                        <option value="modrinthTotalFollowers">Modrinth Followers</option>
                    </select>
                </div>
            </div>
        </div>
        <div></div>
    </header>
    <GraphComponent :isFullDataEnabled="isFullDataEnabled" :dataToDisplay="dataToDisplay" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import GraphComponent from '@/component/graph/Graph.component.vue';

import { DataToDisplay } from '@/type/Options.type';

const isFullDataEnabled = ref<boolean>(false);
const dataToDisplay = ref<DataToDisplay>('pastebinUsages');
</script>

<style lang="scss">
@import './style/main.scss';

header[role=banner] {
    padding: 0.25rem;
    align-items: center;
}
</style>