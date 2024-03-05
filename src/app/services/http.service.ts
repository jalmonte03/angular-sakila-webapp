import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = "http://localhost:5000";
  
  constructor(private httpClient: HttpClient) {

  }

  GetMethod<T>(endpoint: string): Observable<T> {
    return this.httpClient.get(this.apiUrl + endpoint) as Observable<T>;
  }

  PostMethod(endpoint: string, body: any) {
    return this.httpClient.post(this.apiUrl + endpoint, body);
  }

  PutMethod(endpoint: string, body: any) {
    return this.httpClient.put(this.apiUrl + endpoint, body);
  }
  
  PatchMethod(endpoint: string, body: any) {
    return this.httpClient.patch(this.apiUrl + endpoint, body);
  }

  DeleteMethod(endpoint: string) {
    return this.httpClient.delete(this.apiUrl + endpoint);
  }
}
