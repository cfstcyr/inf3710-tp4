import { QueryScript } from 'common/communication/query-script';
import { readFileSync } from 'fs';
import { StatusCodes } from 'http-status-codes';
import { resolve } from 'path';
import { singleton } from 'tsyringe';
import { HttpException } from '../models/http-exception';
import { DatabaseService } from './database.service';

@singleton()
export class QueryScriptService {
    constructor(private readonly databaseService: DatabaseService) {}

    public getQueryScripts(returnType: 'array'): QueryScript[];
    public getQueryScripts(returnType: 'map'): Map<string, string>;
    public getQueryScripts(
        returnType: 'array' | 'map',
    ): QueryScript[] | Map<string, string> {
        if (returnType === 'array') {
            const extractor = new QueryScriptExtractorArray();
            return extractor.getQueryScripts();
        } else {
            const extractor = new QueryScriptExtractorMap();
            return extractor.getQueryScripts();
        }
    }

    public async executeQueryScript(number: string): Promise<object[]> {
        const query = this.getQueryScripts('map').get(number);

        if (!query)
            throw new HttpException(
                `No query script for "${number}"`,
                StatusCodes.NOT_FOUND,
            );

        return this.databaseService.query(query);
    }
}

abstract class AbstractQueryScriptExtractor<R> {
    private queriesFile = '../../../database/Requetes.sql';

    public getQueryScripts(): R {
        const collection = this.init();

        const file = readFileSync(
            resolve(__dirname, this.queriesFile),
            'utf-8',
        );

        const regex = RegExp(/(?<number>4.[0-9]{1,2})/g);
        const results: { number: string; index: number }[] = [];

        for (const r of file.matchAll(regex)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            results.push({ number: r.groups!.number, index: r.index! });
        }

        for (let i = 0; i < results.length - 1; ++i) {
            const { number: n1, index: i1 } = results[i];
            const { index: i2 } = results[i + 1];

            const query = this.parseQuery(file.substring(i1, i2));
            this.add(collection, { number: n1, query });
        }

        const lastResult = results[results.length - 1];
        const lastQuery = this.parseQuery(file.substring(lastResult.index));
        this.add(collection, { number: lastResult.number, query: lastQuery });

        return collection;
    }

    protected abstract init(): R;

    protected abstract add(collection: R, queryScript: QueryScript): void;

    private parseQuery(query: string) {
        const lines = query.split('\n');
        lines.shift();
        return lines
            .filter(
                l =>
                    !l.trim().startsWith('--') &&
                    l.trim().length > 0 &&
                    l.trim() !== '\n',
            )
            .join('\n');
    }
}

class QueryScriptExtractorArray extends AbstractQueryScriptExtractor<
    QueryScript[]
> {
    protected init(): QueryScript[] {
        return [];
    }

    protected add(collection: QueryScript[], queryScript: QueryScript): void {
        collection.push(queryScript);
    }
}

class QueryScriptExtractorMap extends AbstractQueryScriptExtractor<
    Map<string, string>
> {
    protected init(): Map<string, string> {
        return new Map();
    }

    protected add(
        collection: Map<string, string>,
        queryScript: QueryScript,
    ): void {
        collection.set(queryScript.number, queryScript.query);
    }
}
