import dayjs, { Dayjs } from 'dayjs';

export const EMPTY_DATUM: Datum = {
    date: dayjs('EMPTY_DATUM'),
    value: 0,
};

export interface Datum {
    date: Dayjs,
    value: number,
}
