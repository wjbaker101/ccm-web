import { computed, ref, Ref } from 'vue';

import { Datum, EMPTY_DATUM } from '@/type/Datum.type';
import { Options } from '@/type/Options.type';

import { datumService } from '@/service/Datum.service';
import { retrieveService } from '@/service/Retrieve.service';

const fullData = ref<Array<Datum>>([]);

(async () => {
    const data = await retrieveService.get();
    fullData.value = data;
})();

export function useData(options: Ref<Options>) {

    const displayData = computed<Array<Datum>>(() => {
        if (fullData.value.length === 0)
            return [];

        const oldData = retrieveService.getOldData().reduce(options.value.transform, Array<Datum>());
        const scraperData = fullData.value.reduce(options.value.transform, Array<Datum>());

        const totalData = oldData.concat(scraperData);

        const slicedData: Array<Datum> = options.value.isFullData
            ? totalData
            : totalData.slice(-options.value.maxDataCount);

        const filteredData = slicedData.filter(x => !options.value.outliers.has(x.date.format('DD/MM/YYYY')));

        return filteredData;
    });

    const minDatum = computed<Datum>(() => datumService.minArray(displayData.value));
    const maxDatum = computed<Datum>(() => datumService.maxArray(displayData.value));

    const firstDatum = computed<Datum>(() => {
        if (fullData.value.length === 0)
            return EMPTY_DATUM;

        return displayData.value[0]
    });

    const lastDatum = computed<Datum>(() => {
        if (fullData.value.length === 0)
            return EMPTY_DATUM;

        return displayData.value.slice(-1)[0];
    });

    const cumulativeTotal = computed<number>(() => {
        if (fullData.value.length === 0)
            return 0;

        return fullData.value[fullData.value.length - 1].value;
    });

    return {
        displayData,

        minDatum,
        maxDatum,

        firstDatum,
        lastDatum,

        cumulativeTotal,
    }
}
