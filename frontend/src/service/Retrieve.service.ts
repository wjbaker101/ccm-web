import dayjs from 'dayjs';

import oldData from '@/data/old-data.json';

import { Datum, EMPTY_DATUM } from '@/type/Datum.type';

class RetrieveService {

    constructor() {}

    public async getCurseForgeTotalDownloads(): Promise<Array<Datum>> {
        return this.parseUrl('https://raw.githubusercontent.com/wjbaker101/ccm-scraper/master/CurseForge_TotalDownloads.txt');
    }

    public async getPastebinUsages(): Promise<Array<Datum>> {
        return this.parseUrl('https://raw.githubusercontent.com/wjbaker101/ccm-scraper/master/output.txt');
    }

    public getOldData(): Array<Datum> {
        return oldData.map(x => {
            const date = dayjs(x[0], 'DD/MM/YYYY').hour(10).second(6);
            const value = Number(x[1]);

            return {
                date,
                value,
            }
        });
    }

    private async parseUrl(url: string): Promise<Array<Datum>> {
        const response = await fetch(url);
        const text = await response.text();
        const lines = text.split('\n');

        return lines
            .map(this.parseLine)
            .filter(x => x !== EMPTY_DATUM);
    }

    private parseLine(line: string): Datum {
        const pair = line.split('\t');
        if (pair.length !== 2)
            return EMPTY_DATUM;

        const date = dayjs.utc(pair[0]);
        if (!date.isValid())
            return EMPTY_DATUM;

        const value = Number(pair[1]);
        if (Number.isNaN(value))
            return EMPTY_DATUM;

        return {
            date,
            value,
        }
    }
}

export const retrieveService = new RetrieveService();
