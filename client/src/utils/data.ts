import { HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Subject, Subscription, throwError } from "rxjs";
import { AlertManagerService } from "src/services/alert-manager/alert-manager.service";
import { ApiService } from "src/services/api-service/api.service";

export interface CollectionData<T> {
    loading: boolean;
    error?: string;
    data: T[];
    updated: Date;
}

export const DefaultCollectionData = <T>(loading = false): CollectionData<T> => ({ loading, data: [], updated: new Date() });

export class Collection<T> {
    private path: string;
    private data: BehaviorSubject<CollectionData<T> | undefined>;
    private apiService: ApiService;
    private alertManager: AlertManagerService;

    constructor (path: string, apiService: ApiService, alertManager: AlertManagerService) {
        this.path = path;
        this.data = new BehaviorSubject<CollectionData<T> | undefined>(undefined);
        this.apiService = apiService;
        this.alertManager = alertManager;
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
                    this.data.next({ 
                        loading: false, 
                        data: [], 
                        error: this.getErrorMessage(error), 
                        updated: new Date(),
                    });
                    return throwError(() => error);
                }),
            )
            .subscribe((data) => {
                this.data.next({ loading: false, data, updated: new Date() })
            });

        return observable;
    }

    insert(data: Partial<T>) {
        this.nextLoading();

        const s = new Subject<void>();

        const observable = this.apiService.post<null>(this.path, { data });
        observable 
            .pipe(
                catchError((error: Error) => {
                    this.alertManager.error(this.getErrorMessage(error));
                    return throwError(() => error);
                }),
            )
            .subscribe(() => {
                this.fetch().subscribe(() => s.next());
            });

        return s.asObservable();
    }

    delete(id: number | string) {
        this.nextLoading();

        const s = new Subject<void>();

        const observable = this.apiService.delete<null>(this.path, { id });
        observable 
            .pipe(
                catchError((error: Error) => {
                    this.alertManager.error(String(error));
                    return throwError(() => error);
                }),
            )
            .subscribe(() => {
                this.fetch().subscribe(() => s.next());
            });

        return s.asObservable();
    }

    patch(id: number | string, updates: Partial<T>) {
        this.nextLoading();

        const s = new Subject<void>();

        const observable = this.apiService.patch<null>(this.path, { id, updates });
        observable 
            .pipe(
                catchError((error: Error) => {
                    this.alertManager.error(String(error));
                    return throwError(() => error);
                }),
            )
            .subscribe(() => {
                this.fetch().subscribe(() => s.next());
            });

        return s.asObservable();
    }

    private nextLoading() {
        this.data.next({ loading: true, data: this.data.value?.data ?? [], updated: this.data.value?.updated ?? new Date() });
    }

    private getErrorMessage(error: Error): string {
        return error instanceof HttpErrorResponse 
            ? (error.error.message 
                ? error.error.message 
                : error.message) 
            : String(error);
    }
}