<template>
    <div class="graph-component flex flex-vertical">
        <div class="graph-top flex flex-auto gap">
            <div></div>
            <div class="flex-auto">
                <small>Min: </small>
                <strong :title="minDatum.date">{{ minDatum.value }}</strong>
            </div>
            <div class="flex-auto">
                <small>Max: </small>
                <strong :title="maxDatum.date">{{ maxDatum.value }}</strong>
            </div>
            <div class="flex-auto">
                <small>Latest: </small>
                <strong :title="lastDatum.date">{{ lastDatum.value }}</strong>
                <strong class="diff-value" :class="{ [diffColour]: true }"> (<span class="value">{{ latestDiffValue }}</span>)</strong>
            </div>
            <div></div>
        </div>
        <div ref="graphComponent" class="graph-container">
            <svg :width="graphWidth" :height="graphHeight" class="graph-canvas" :viewbox="`0 0 ${graphWidth} ${graphHeight}`">
                <path class="current-value-horizontal-line" :d="currentValueHorizontalLine" stroke="rgba(23, 107, 192, 0.4)" fill="none" />
                <path class="data-line" :d="valuesLine" stroke="#ffb400" fill="none" />
            </svg>
        </div>
        <div class="graph-bottom flex flex-auto gap">
            <div class="flex-auto">
                {{ formatDate(firstDatum.date) }}
            </div>
            <div class="text-centered">
                <strong>Date </strong>
                <small>({{displayDateRange}})</small>
            </div>
            <div class="flex-auto">
                {{ formatDate(lastDatum.date) }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import { useData } from '@/component/use/Data.use';

import { Options } from '@/type/Options.type';
import { Dayjs } from 'dayjs';

interface Props {
    isFullDataEnabled: boolean,
}

export default {
    name: 'GraphComponent',

    props: {
        isFullDataEnabled: Boolean,
    },

    setup(props: Props) {
        const options = computed<Options>(() => ({
            isFullData: props.isFullDataEnabled,
            maxDataCount: 90,
            transform: (total, datum, index, array) => {
                if (index > 0)
                    total.push({
                        date: datum.date,
                        value: datum.value - array[index - 1].value,
                    });

                return total;
            },
        }));

        const {
            displayData,
            minDatum,
            maxDatum,
            firstDatum,
            lastDatum,
        } = useData(options);

        const graphComponent = ref<HTMLDivElement | null>(null);

        const graphWidth = ref<number>(1024);
        const graphHeight = ref<number>(576);

        const latestDiffValue = computed<number>(() => {
            if (displayData.value.length < 2)
                return 0;

            const last2 = displayData.value.slice(-2);

            return last2[1].value - last2[0].value;
        });

        const diffColour = computed<string>(() => {
            if (latestDiffValue.value === 0)
                return '';

            if (latestDiffValue.value > 0)
                return 'is-positive';

            return 'is-negative';
        });

        const valueToY = function (value: number): number {
            return graphHeight.value
                - (value - minDatum.value.value)
                * (graphHeight.value)
                / (maxDatum.value.value - minDatum.value.value);
        };

        const onWindowResize = function () {
            if (graphComponent.value === null)
                return;

            graphWidth.value = graphComponent.value.offsetWidth - 2;
            graphHeight.value = graphComponent.value.offsetHeight - 2;
        };

        const valuesLine = computed<string>(() => {
            const xGap = graphWidth.value / (displayData.value.length - 1);

            const positions = displayData.value.map((datum, index) => ({
                x: index * xGap,
                y: valueToY(datum.value),
            }));

            const points = positions.map(pos => `${pos.x} ${pos.y}`);

            return `M${points.join(' L')}`;
        });

        const currentValueHorizontalLine = computed<string>(() => {
            const y = valueToY(lastDatum.value.value);

            const pos1 = `0 ${y}`;
            const pos2 = `${graphWidth.value} ${y}`;

            return `M${[pos1, pos2].join(' L')}`;
        });

        const displayDateRange = computed<string>(() => {
            const span = lastDatum.value.date.from(firstDatum.value.date, true);
            return `${span} span`;
        });

        onMounted(async () => {
            window.addEventListener('resize', onWindowResize);
            onWindowResize();
        });

        onUnmounted(() => {
            window.removeEventListener('resize', onWindowResize);
        });

        return {
            graphComponent,

            graphWidth,
            graphHeight,

            valuesLine,
            currentValueHorizontalLine,

            minDatum,
            maxDatum,
            firstDatum,
            lastDatum,
            latestDiffValue,

            displayDateRange,

            diffColour,

            formatDate(date: Dayjs): string {
                return date.format('DD/MM/YYYY');
            },
        }
    },
}
</script>

<style lang="scss">
.graph-component {
    width: 1600px;
    max-width: 100%;
    height: 800px;
    max-height: 100%;
    position: relative;
    margin: auto;
    padding: 0 1rem;
    vertical-align: top;

    .graph-container {
        border: 1px solid transparentize(#191d2c, 0.5);
        background-color: transparent;
        border-radius: 3px;
    }

    .graph-canvas {
        position: absolute;
        filter: drop-shadow(1px 1px 1px #111);
    }

    .diff-value {
        &.is-positive {
            color: #54e054;

            .value::before {
                content: '+';
            }
        }

        &.is-negative {
            color: #e00303;
        }
    }

    .graph-bottom {
        opacity: 0.4;
    }
}
</style>