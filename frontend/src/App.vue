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
        <div>
            Overall Downloads: {{ Intl.NumberFormat().format(overallDownloads) }}
        </div>
    </header>
    <GraphComponent :isFullDataEnabled="isFullDataEnabled" :dataToDisplay="dataToDisplay" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import GraphComponent from '@/component/graph/Graph.component.vue';

import { useData } from '@/component/use/Data.use';

import { DataToDisplay, Options } from '@/type/Options.type';

const data = useData(ref<Options>({
    dataToDisplay: 'pastebinUsages',
    isFullData: true,
    maxDataCount: 0,
    transform: () => [],
    outliers: new Set(),
}));

const isFullDataEnabled = ref<boolean>(false);
const dataToDisplay = ref<DataToDisplay>('pastebinUsages');

const overallDownloads = data.overallDownloads;
</script>

<style lang="scss">
@import './style/main.scss';

header[role=banner] {
    padding: 0.25rem;
    align-items: center;
}
</style>