import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { s } from 'src/utils/url';
import { Status } from 'common/communication/status';
import { Data } from 'src/utils/data';

interface Options {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  status(): Observable<Status> {
    return this.http.get<Status>(s('/'));
  }

  createData<T>(path: string): Data<T> {
    return new Data<T>(path, this);
  }

  get<T>(path: string, options: Options = {}): Observable<T> {
    return this.http.get<T>(s(path), { ...options });
  }

  post<T>(path: string, body: any | null, options: Options = {}) {
    return this.http.post<T>(s(path), body, { ...options });
  }

  patch<T>(path: string, body: any | null, options: Options = {}) {
    return this.http.patch<T>(s(path), body, { ...options });
  }

  delete<T>(path: string, body: any | null) {
    return this.http.delete<T>(s(path), {body: {...body}});
  }
}
