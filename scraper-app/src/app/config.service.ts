import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) { }

  getUrl ='http://18.219.217.158:3134/getJson';

  getJson(urlString, toolType, username) {
    return this.http.get(this.getUrl, {
      params: {
        url: urlString,
        type: toolType,
        username: username
      }
    });
  }

}
