import { Datum } from '@/type/Datum.type';

export interface Options {
    isFullData: boolean;
    maxDataCount: number;
    transform: (prev: Array<Datum>, current: Datum, index: number, all: Array<Datum>) => Array<Datum>;
}
