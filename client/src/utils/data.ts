import { BehaviorSubject, catchError, Subscription, throwError } from "rxjs";
import { ApiService } from "src/services/api-service/api.service";

export interface CollectionData<T> {
    loading: boolean;
    error?: string;
    data: T[];
    updated: Date;
}

export const DefaultResponseData = <T>(loading = false): CollectionData<T> => ({ loading, data: [], updated: new Date() });

export class Collection<T> {
    private path: string;
    private data: BehaviorSubject<CollectionData<T> | undefined>;
    private apiService: ApiService;

    constructor (path: string, apiService: ApiService) {
        this.path = path;
        this.data = new BehaviorSubject<CollectionData<T> | undefined>(undefined);
        this.apiService = apiService;
    }

    subscribe(next: (value: CollectionData<T>) => void): Subscription {
        if (this.data.value === undefined) {
            this.fetch();
        }
        return this.data.subscribe((value) => {
            if (value) next(value);
        });
    }

    fetch() {
        this.nextLoading();

        const observable = this.apiService.get<T[]>(this.path);
        observable
            .pipe(
            catchError((error: Error) => {
                this.data.next({ loading: false, data: [], error: String(error), updated: new Date() });
                return throwError(() => error);
            })
            )
            .subscribe((data) => {
                this.data.next({ loading: false, data, updated: new Date() })
            });

        return observable;
    }

    delete(id: number) {
        this.nextLoading();

        const observable = this.apiService.delete<null>(this.path, { id });
        
    }

    private nextLoading() {
        this.data.next({ loading: true, data: this.data.value?.data ?? [], updated: this.data.value?.updated ?? new Date() });
    }
}