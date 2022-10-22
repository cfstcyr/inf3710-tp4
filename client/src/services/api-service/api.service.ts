import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { s } from 'src/utils/url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<{ status: 'ok' | undefined }>(s('/'));
  }
}
