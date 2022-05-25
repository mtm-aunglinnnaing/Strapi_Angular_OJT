import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public categoryMaster: any;
  constructor(private http: HttpClient) { }
  public options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  setAuthHeader() {
    this.options.headers = this.options.headers.set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
  }
  setMultiPartFormDataHeader() {
    this.options.headers = this.options.headers.set(
      'Content-Type',
      'multipart/form-data'
    );
  }
  removeContentTypeHeader() {
    this.options.headers = this.options.headers.delete('Content-Type');
  }
  get(path: string, params = {}): Promise<object> {
    return this.http
      .get(`${environment.apiUrl}/${path}`, { ...this.options, params })
      .toPromise()
      .catch(this.errorHandler);
  }

  getCategory(path: string, params = {}): Promise<object> {
    return this.http
      .get(`${environment.apiUrl}/${path}`, { ...this.options, params })
      .toPromise()
      // .then((res) => {
      //   this.categoryMaster = res;
      //   console.log('ttttttttttttttttttttttt', this.categoryMaster)
      //   return this.categoryMaster;
      // })
      .catch(this.errorHandler);
  }

  post(path: string, params = {}): Promise<object> {
    return this.http
      .post(`${environment.apiUrl}/${path}`, params, { ...this.options })
      .toPromise()
      .catch(this.errorHandler);
  }

  put(path: string, params = {}): Promise<object> {
    return this.http
      .put(`${environment.apiUrl}/${path}`, params, { ...this.options })
      .toPromise()
      .catch(this.errorHandler);
  }

  delete(path: string, params = {}) {
    return this.http
      .delete(`${environment.apiUrl}/${path}`, { ...this.options })
      .toPromise()
      .catch(this.errorHandler);
  }

  private errorHandler(err: any) {
    console.log('Error occurred.', err);
    return Promise.reject(err);
  }
}
