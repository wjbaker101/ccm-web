<template>
    <header role="banner" class="flex gap-small">
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
    </header>
    <GraphComponent :isFullDataEnabled="isFullDataEnabled" :dataToDisplay="dataToDisplay" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { DataToDisplay } from '@/type/Options.type';

import GraphComponent from '@/component/graph/Graph.component.vue';

export default defineComponent({
    name: 'App',

    components: {
        GraphComponent,
    },

    setup() {
        const isFullDataEnabled = ref<boolean>(false);
        const dataToDisplay = ref<DataToDisplay>('pastebinUsages');

        return {
            isFullDataEnabled,
            dataToDisplay,
        }
    },
})
</script>

<style lang="scss">
@import './style/main.scss';

header[role=banner] {
    padding: 0.25rem;
    align-items: center;
}
</style>
