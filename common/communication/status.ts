export type StatusItem = 'ok' | 'error';

export interface Status {
    server: StatusItem;
    db: StatusItem;
}