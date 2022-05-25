import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public options = {
    headers: new HttpHeaders(),
  };
  constructor(private http: HttpClient) {}
  get(url): Promise<any> {
    // this.options.headers = this.options.headers.set(
    //   'Content-Type',
    //   'text/plain'
    // );
    return this.http.get(url, this.options).toPromise();
  }
}
