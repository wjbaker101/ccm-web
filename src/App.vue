<template>
    <header role="banner" class="flex gap-small">
        <div class="flex-auto">
            <strong>Custom Crosshair Mod Stats</strong>
        </div>
        <div class="flex-auto">
            <label>
                <input type="checkbox" v-model="isFullDataEnabled">
                <span>Show Full History</span>
            </label>
        </div>
    </header>
    <GraphComponent :isFullDataEnabled="isFullDataEnabled" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import GraphComponent from '@/component/graph/Graph.component.vue';

export default defineComponent({
    name: 'App',

    components: {
        GraphComponent,
    },

    setup() {
        const isFullDataEnabled = ref<boolean>(false);

        return {
            isFullDataEnabled,
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
