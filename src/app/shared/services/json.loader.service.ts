import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {Observable} from 'rxjs/Rx';

@Injectable()
export class JSONLoaderService {

  constructor(private http: HttpClient) {
    var obj;
    this.getJSON().subscribe(data => obj=data, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.http.get("../../../assets/json/transactionTypes.json")
      .map((res:any) => res);

  }
}
