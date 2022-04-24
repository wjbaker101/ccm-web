import { Datum } from '@/type/Datum.type';

export type DataToDisplay = 'pastebinUsages' | 'curseForgeTotalDownloads';

export interface Options {
    dataToDisplay: DataToDisplay;
    isFullData: boolean;
    maxDataCount: number;
    transform: (prev: Array<Datum>, current: Datum, index: number, all: Array<Datum>) => Array<Datum>;
    outliers: Set<string>;
}
