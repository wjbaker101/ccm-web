import { Datum, EMPTY_DATUM } from '@/type/Datum.type';

class DatumService {

    minArray(data: Array<Datum>): Datum {
        if (data.length === 0)
            return EMPTY_DATUM;

        let min = data[0];

        for (let i = 1; i < data.length; ++i) {
            min = this.min(min, data[i]);
        }

        return min;
    }

    maxArray(data: Array<Datum>): Datum {
        if (data.length === 0)
            return EMPTY_DATUM;

        let max = data[0];

        for (let i = 1; i < data.length; ++i) {
            max = this.max(max, data[i]);
        }

        return max;
    }

    min(a: Datum, b: Datum): Datum {
        if (a.value < b.value)
            return a;

        return b;
    }

    max(a: Datum, b: Datum): Datum {
        if (a.value > b.value)
            return a;

        return b;
    }
}

export const datumService = new DatumService();
