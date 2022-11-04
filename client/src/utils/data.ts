import { BehaviorSubject, catchError, Subscription, throwError } from "rxjs";
import { ApiService } from "src/services/api-service/api.service";

export interface ResponseData<T> {
    loading: boolean;
    error?: string;
    data: T[];
}

export const DefaultResponseData = <T>(loading = false): ResponseData<T> => ({ loading, data: [] });

export class Data<T> {
    private path: string;
    private data: BehaviorSubject<ResponseData<T> | undefined>;
    private apiService: ApiService;

    constructor (path: string, apiService: ApiService) {
        this.path = path;
        this.data = new BehaviorSubject<ResponseData<T> | undefined>(undefined);
        this.apiService = apiService;
    }

    subscribe(next: (value: ResponseData<T>) => void): Subscription {
        if (this.data.value === undefined) {
            this.fetch();
        }
        return this.data.subscribe((value) => {
            if (value) next(value);
        });
    }

    fetch() {
        this.data.next({ loading: true, data: this.data.value?.data ?? [] });

        const observable = this.apiService.get<T[]>(this.path);
        observable
            .pipe(
            catchError((error: Error) => {
                this.data.next({ loading: false, data: [], error: String(error) });
                return throwError(() => error);
            })
            )
            .subscribe((data) => {
                this.data.next({ loading: false, data })
            });

        return observable;
    }
}