import { computed, ref, Ref } from 'vue';

import { Datum, EMPTY_DATUM } from '@/type/Datum.type';
import { Options } from '@/type/Options.type';

import { datumService } from '@/service/Datum.service';
import { retrieveService } from '@/service/Retrieve.service';

import pastebinUsagesOutliers from '@/data/outlier-dates.json';
import curseforgeDownloadsOutlierDates from '@/data/curseforge-downloads-outlier-dates.json';

const pastebinUsages = ref<Array<Datum>>([]);
const curseForgeTotalDownloads = ref<Array<Datum>>([]);

(async () => {
    pastebinUsages.value = await retrieveService.getPastebinUsages();
    curseForgeTotalDownloads.value = await retrieveService.getCurseForgeTotalDownloads();
})();

export function useData(options: Ref<Options>) {

    const fullData = computed<Array<Datum>>(() => {
        if (options.value.dataToDisplay === 'pastebinUsages')
            return pastebinUsages.value;

        if (options.value.dataToDisplay === 'curseForgeTotalDownloads')
            return curseForgeTotalDownloads.value;

        return [];
    });

    const displayData = computed<Array<Datum>>(() => {
        if (fullData.value.length === 0)
            return [];

        const oldData = retrieveService.getOldData().reduce(options.value.transform, Array<Datum>());

        const scraperData = fullData.value.length > 1
            ? fullData.value.reduce(options.value.transform, Array<Datum>())
            : [ fullData.value[0] ];

        const totalData = options.value.dataToDisplay === 'pastebinUsages'
            ? oldData.concat(scraperData)
            : scraperData;

        const slicedData: Array<Datum> = options.value.isFullData
            ? totalData
            : totalData.slice(-options.value.maxDataCount);

        if (options.value.dataToDisplay === 'pastebinUsages') {
            return slicedData
                .filter(x => !pastebinUsagesOutliers.includes(x.date.format('DD/MM/YYYY')));
        }

        if (options.value.dataToDisplay === 'curseForgeTotalDownloads') {
            return slicedData
                .filter(x => !curseforgeDownloadsOutlierDates.includes(x.date.format('DD/MM/YYYY')));
        }

        return slicedData;
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
